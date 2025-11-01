import styled from "styled-components";
import api from "../api";
import Button from "./Button";
import type DiagnosisResult from "../types/DIagnosisResult";

interface Props {
  photoBlob: Blob | null;
  diagnosisLoading: boolean;
  diagnosis: DiagnosisResult | null;
  resetPhoto: () => void;
  setDiagnosis: (arg: DiagnosisResult | null) => void;
  setDiagnosisLoading: (arg: boolean) => void;
}

export default function ButtonActions({
  photoBlob,
  diagnosisLoading,
  diagnosis,
  resetPhoto,
  setDiagnosis,
  setDiagnosisLoading,
}: Props) {
  const handleDiagnose = async () => {
    if (!photoBlob) return;
    setDiagnosisLoading(true);

    const formData = new FormData();
    formData.append("file", photoBlob, "photo.jpg");

    try {
      const response = await api.post("/diagnose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result: DiagnosisResult = response.data.diagnosis;
      setDiagnosis(result);
    } catch (error) {
      console.error("Diagnosis failed:", error);
    } finally {
      setDiagnosisLoading(false);
    }
  };

  return (
    <ButtonGroup>
      {!diagnosis && (
        <Button
          onClick={handleDiagnose}
          loading={diagnosisLoading}
          variant="diagnose"
        >
          🔍 Diagnose
        </Button>
      )}
      <Button onClick={resetPhoto} variant="red">
        🔄 New photo
      </Button>
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  margin-top: 1rem;
  align-items: center;
`;
