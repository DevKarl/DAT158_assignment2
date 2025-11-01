import styled from "styled-components";
import ImageContainer from "./ImageContainer";

interface Props {
  photoURL: string;
}

export default function PhotoTaken({ photoURL }: Props) {
  return (
    <ImageContainer>
      <CapturedPhoto src={photoURL} alt="Captured plant photo" />
    </ImageContainer>
  );
}

const CapturedPhoto = styled.img`
  width: 100%;
  border: 4px solid #4caf50;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 128, 0, 0.4);
  transition: border 0.3s ease;
`;
