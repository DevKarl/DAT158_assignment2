import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 40px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.25s;
  color: white;
  background-color: #6e8d73;

  &:hover {
    background-color: #6d8773;
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

interface Props {
  onUpload: (blob: Blob, url: string) => void;
}

export default function PhotoUpload({ onUpload }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(file, url);
    }
  };

  return (
    <UploadContainer>
      <HiddenInput
        type="file"
        accept="image/*"
        id="file-upload"
        onChange={handleFileChange}
      />
      <StyledLabel htmlFor="file-upload">📁 Velg fil</StyledLabel>
    </UploadContainer>
  );
}
