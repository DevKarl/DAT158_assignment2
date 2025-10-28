import { useEffect, useRef } from "react";
import "./CameraFeed.css";

interface Props {
  onCapture: (blob: Blob, url: string) => void;
}

export default function CameraFeed({ onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) onCapture(blob, URL.createObjectURL(blob));
      }, "image/jpeg");
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay className="video-stream" />
      <button className="btn primary" onClick={takePhoto}>
        📸 Take Photo
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
