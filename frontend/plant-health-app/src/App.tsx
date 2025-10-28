import { useEffect, useRef, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!photoURL) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    }
  }, [photoURL]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setPhotoBlob(blob);
          setPhotoURL(URL.createObjectURL(blob));
          setFlash(true);
          setTimeout(() => setFlash(false), 300); // Flash effect duration
        }
      }, "image/jpeg");
    }
  };

  const resetPhoto = () => {
    setPhotoBlob(null);
    setPhotoURL(null);
    setDiagnosis(null);
  };

  const sendPhoto = async () => {
    if (!photoBlob) return;

    const formData = new FormData();
    formData.append("file", photoBlob, "photo.jpg");

    try {
      const response = await api.post("/diagnose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDiagnosis(response.data.diagnosis);
    } catch (error) {
      console.error("Diagnosis failed:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>🌿 Plant Health Diagnoser</h1>

      <div className={`flash-overlay ${flash ? "active" : ""}`} />

      {!photoURL ? (
        <>
          <video ref={videoRef} autoPlay className="video-stream" />
          <div className="button-group">
            <button className="btn primary" onClick={takePhoto}>
              📸 Take Photo
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={photoURL} alt="Captured" className="captured-photo" />
          <div className="button-group">
            <button className="btn success" onClick={sendPhoto}>
              🔍 Diagnose
            </button>
            <button className="btn secondary" onClick={resetPhoto}>
              🔄 Take New Photo
            </button>
          </div>
          {diagnosis && (
            <p className="diagnosis-text">
              <strong>Diagnosis:</strong> {diagnosis}
            </p>
          )}
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default App;
