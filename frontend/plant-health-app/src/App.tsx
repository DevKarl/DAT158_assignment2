import { useState } from "react";
import styled from "styled-components";
import CameraView from "./components/CameraView";
import PhotoTaken from "./components/PhotoTaken";
import Diagnosis from "./components/Diagnosis";
import ButtonActions from "./components/ButtonActions";
import PhotoUpload from "./components/PhotoUpload";
import { handleNormalize } from "./helpers/normalizeImage";
import Button from "./components/Button";
import { createGlobalStyle } from "styled-components";
import SupportedPlants from "./components/SupportedPlants";
import type DiagnosisResult from "./types/DIagnosisResult";

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #556f4c;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    justify-content: center;
    min-width: 320px;
    min-height: 100vh;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }

    a:hover {
      color: #747bff;
    }
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-align: center;
  margin: auto;
  font-family: sans-serif;
  color: white;
`;

const FlashOverlay = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: ${({ active }) => (active ? 0.8 : 0)};
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 999;
`;

const CameraToggle = styled.div`
  margin-bottom: 1rem;
`;

const BackgroundOption = styled.div`
  margin-top: 1rem;
`;

const StyledParagraph = styled.p`
  margin-top: 15px;
  margin-bottom: 0px;
`;

function App() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [clearingLoading, setClearingLoading] = useState(false);
  const [bgCleared, setBgCleared] = useState(false);
  const [flash, setFlash] = useState(false);

  const setPhoto = (blob: Blob | null, url: string | null) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
  };

  const resetPhoto = () => {
    setPhoto(null, null);
    setDiagnosis(null);
    setBgCleared(false);
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
      setBgCleared(true);
    } catch (error) {
      console.error("Normalization failed:", error);
    } finally {
      setClearingLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <h2>⛑️Plant Health Diagnoser</h2>
        <SupportedPlants />
        <FlashOverlay active={flash} />
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
                <CameraToggle>
                  <Button onClick={() => setCameraActive(false)} variant="red">
                    ✋ Deactivate Camera
                  </Button>
                </CameraToggle>
                <CameraView photoURL={photoURL} onCapture={onCapture} />
              </>
            ) : (
              <CameraToggle>
                <Button
                  onClick={() => setCameraActive(true)}
                  variant="activateCamera"
                >
                  📷 Activate Camera
                </Button>
              </CameraToggle>
            )}
            <StyledParagraph>OR..</StyledParagraph>
            <PhotoUpload onUpload={onUpload} />
          </>
        )}
        {!bgCleared && photoURL && !diagnosis && (
          <BackgroundOption>
            <Button
              onClick={onClearBackground}
              loading={clearingLoading}
              variant="clearBg"
            >
              ✨ Clear Background
            </Button>
          </BackgroundOption>
        )}
        {
          <StyledParagraph>
            {bgCleared && !diagnosis && <em> Background cleared ✓ </em>}
            {!bgCleared && photoURL && (
              <em>Clearing the background can make the result more accurate</em>
            )}
          </StyledParagraph>
        }
      </AppContainer>
    </>
  );
}

export default App;
