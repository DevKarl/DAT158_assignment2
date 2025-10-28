interface Props {
  photoURL: string;
  onDiagnose: () => void;
  onReset: () => void;
}

export default function CapturedPhoto({
  photoURL,
  onDiagnose,
  onReset,
}: Props) {
  return (
    <div className="photo-container">
      <img src={photoURL} alt="Captured" className="captured-photo" />
      <div className="button-group">
        <button className="btn success" onClick={onDiagnose}>
          🔍 Diagnose
        </button>
        <button className="btn secondary" onClick={onReset}>
          🔄 Take New Photo
        </button>
      </div>
    </div>
  );
}
