import { useState } from "react";
import "./App.css";
import CameraView from "./components/CameraView";
import PhotoTaken from "./components/PhotoTaken";
import Diagnosis from "./components/Diagnosis";
import ButtonActions from "./components/ButtonActions";
import PhotoUpload from "./components/PhotoUpload";
import { handleNormalize } from "./helpers/normalizeImage";
import Button from "./components/Button";

function App() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [clearingLoading, setClearingLoading] = useState(false);

  const [flash, setFlash] = useState(false);

  const setPhoto = (blob: Blob | null, url: string | null) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
  };

  const resetPhoto = () => {
    setPhoto(null, null);
    setDiagnosis(null);
  };

  const onCapture = (blob: Blob, url: string) => {
    setPhoto(blob, url);
    flashEffect();
  };

  const onUpload = (blob: Blob, url: string) => {
    setPhoto(blob, url);
  };

  const flashEffect = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  const onClearBackground = async () => {
    if (!photoBlob) return;
    setClearingLoading(true);
    try {
      const { blob, url } = await handleNormalize(photoBlob);
      setPhotoBlob(blob);
      setPhotoURL(url);
    } catch (error) {
      console.error("Normalization failed:", error);
    } finally {
      setClearingLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🌿 Plant Health Diagnoser</h1>
      <div className={`flash-overlay ${flash ? "active" : ""}`} />
      {photoURL ? (
        <>
          <PhotoTaken photoURL={photoURL} />
          <ButtonActions
            photoBlob={photoBlob}
            diagnosisLoading={diagnosisLoading}
            setDiagnosis={setDiagnosis}
            resetPhoto={resetPhoto}
            setDiagnosisLoading={setDiagnosisLoading}
            diagnosis={diagnosis}
          />
          {diagnosis && <Diagnosis diagnosis={diagnosis} />}
        </>
      ) : (
        <>
          {cameraActive ? (
            <>
              <div className="camera-toggle">
                <button onClick={() => setCameraActive(false)}>
                  ✋ Deactivate Camera
                </button>
              </div>
              <CameraView photoURL={photoURL} onCapture={onCapture} />
            </>
          ) : (
            <div className="camera-toggle">
              <button onClick={() => setCameraActive(true)}>
                📷 Activate Camera
              </button>
            </div>
          )}
          <p>OR..</p>
          <PhotoUpload onUpload={onUpload} />
        </>
      )}
      {photoURL && !diagnosis && (
        <div className="background-option">
          <Button
            onClick={onClearBackground}
            loading={clearingLoading}
            className="btn clearBg"
          >
            ✨ Clear Background
          </Button>
          <p>
            <em>Use this option for more accuracy</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
