interface Props {
  diagnosis: string | null;
}

export default function DiagnosisResult({ diagnosis }: Props) {
  if (!diagnosis) return null;
  return (
    <p className="diagnosis-text">
      <strong>Diagnosis:</strong> {diagnosis}
    </p>
  );
}
