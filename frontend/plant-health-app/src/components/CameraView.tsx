import { useCamera } from "../hooks/useCamera";

interface Props {
  onCapture: (blob: Blob, url: string) => void;
  photoURL: any;
  canvasRef: any;
}

export default function CameraView({ onCapture, photoURL, canvasRef }: Props) {
  const videoRef = useCamera(photoURL);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob: Blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          onCapture(blob, url);
        }
      }, "image/jpeg");
    }
  };

  return (
    <>
      <video ref={videoRef} autoPlay className="video-stream" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="button-group">
        <button className="btn primary" onClick={takePhoto}>
          📸 Take Photo
        </button>
      </div>
    </>
  );
}
