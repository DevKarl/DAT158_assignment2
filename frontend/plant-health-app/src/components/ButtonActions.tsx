import api from "../api";

interface Props {
  photoBlob: Blob | null;
  setPhotoBlob: (arg: Blob | null) => void;
  setDiagnosis: (arg: string | null) => void;
  setPhotoURL: (arg: string | null) => void;
}

export default function ButtonActions({
  photoBlob,
  setPhotoBlob,
  setPhotoURL,
  setDiagnosis,
}: Props) {
  const resetPhoto = () => {
    setPhotoBlob(null);
    setPhotoURL(null);
    setDiagnosis(null);
  };

  const sendPhoto = async () => {
    if (!photoBlob) return;

    const formData = new FormData();
    formData.append("file", photoBlob, "photo.jpg");

    try {
      const response = await api.post("/diagnose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDiagnosis(response.data.diagnosis);
    } catch (error) {
      console.error("Diagnosis failed:", error);
    }
  };

  return (
    <div className="button-group">
      <button className="btn success" onClick={sendPhoto}>
        🔍 Diagnose
      </button>
      <button className="btn secondary" onClick={resetPhoto}>
        🔄 Take New Photo
      </button>
    </div>
  );
}
