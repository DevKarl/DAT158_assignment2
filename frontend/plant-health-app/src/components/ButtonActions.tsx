import api from "../api";
import Button from "./Button";

interface Props {
  photoBlob: Blob | null;
  diagnosisLoading: boolean;
  diagnosis: string | null;
  resetPhoto: () => void;
  setDiagnosis: (arg: string | null) => void;
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
      setDiagnosis(response.data.diagnosis);
    } catch (error) {
      console.error("Diagnosis failed:", error);
    } finally {
      setDiagnosisLoading(false);
    }
  };

  return (
    <div className="button-group">
      {!diagnosis && (
        <Button
          onClick={handleDiagnose}
          loading={diagnosisLoading}
          className="btn success"
        >
          🔍 Diagnose
        </Button>
      )}
      <Button onClick={resetPhoto} className="btn secondary">
        🔄 Reset Photo
      </Button>
    </div>
  );
}
