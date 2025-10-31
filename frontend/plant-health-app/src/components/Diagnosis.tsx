interface Props {
  diagnosis: string | null;
}

export default function Diagnosis({ diagnosis }: Props) {
  return (
    <p className="diagnosis-text">
      <strong>Backend response:</strong> {diagnosis}
    </p>
  );
}
