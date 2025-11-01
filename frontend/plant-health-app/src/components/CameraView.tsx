import styled from "styled-components";
import { useRef } from "react";
import { useCamera } from "../hooks/useCamera";
import ImageContainer from "./ImageContainer";
import Button from "./Button";

interface Props {
  onCapture: (blob: Blob, url: string) => void;
  photoURL: null | string;
}

export default function CameraView({ onCapture, photoURL }: Props) {
  const videoRef = useCamera(photoURL);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef?.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          onCapture(blob, url);
        }
      }, "image/jpeg");
    }
  };

  return (
    <ImageContainer>
      <VideoStream ref={videoRef} autoPlay muted playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button onClick={takePhoto} variant="default">
        📸 Take Photo
      </Button>
    </ImageContainer>
  );
}

const VideoStream = styled.video`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
