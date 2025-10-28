import { useState } from "react";
import CameraFeed from "./components/CameraFeed";
import CapturedPhoto from "./components/CapturedPhoto";
import DiagnosisResult from "./components/DiagnosisResult";
import api from "./api";
import "./App.css";

function App() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  const handleCapture = (blob: Blob, url: string) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
  };

  const handleReset = () => {
    setPhotoBlob(null);
    setPhotoURL(null);
    setDiagnosis(null);
  };

  const handleDiagnose = async () => {
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
      {!photoURL ? (
        <CameraFeed onCapture={handleCapture} />
      ) : (
        <>
          <CapturedPhoto
            photoURL={photoURL}
            onDiagnose={handleDiagnose}
            onReset={handleReset}
          />
          <DiagnosisResult diagnosis={diagnosis} />
        </>
      )}
    </div>
  );
}

export default App;
