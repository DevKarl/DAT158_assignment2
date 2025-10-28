import { useRef, useState } from "react";
import api from "./api";
import "./App.css";
import CameraView from "./components/CameraView";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const resetPhoto = () => {
    setPhotoBlob(null);
    setPhotoURL(null);
    setDiagnosis(null);
  };

  const onCapture = (blob: Blob, url: string) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
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
        <CameraView
          photoURL={photoURL}
          canvasRef={canvasRef}
          onCapture={onCapture}
        />
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
