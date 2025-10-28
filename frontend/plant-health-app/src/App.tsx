import { useState } from "react";
import "./App.css";
import CameraView from "./components/CameraView";
import PhotoTaken from "./components/PhotoTaken";
import Diagnosis from "./components/Diagnosis";
import ButtonActions from "./components/ButtonActions";

function App() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const onCapture = (blob: Blob, url: string) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <div className="app-container">
      <h1>🌿 Plant Health Diagnoser</h1>
      <div className={`flash-overlay ${flash ? "active" : ""}`} />
      {!photoURL ? (
        <CameraView photoURL={photoURL} onCapture={onCapture} />
      ) : (
        <>
          <PhotoTaken photoURL={photoURL} />
          <ButtonActions
            photoBlob={photoBlob}
            setPhotoBlob={setPhotoBlob}
            setPhotoURL={setPhotoURL}
            setDiagnosis={setDiagnosis}
          />
          {diagnosis && <Diagnosis diagnosis={diagnosis} />}
        </>
      )}
    </div>
  );
}

export default App;
