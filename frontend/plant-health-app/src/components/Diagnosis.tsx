interface Props {
  diagnosis: string | null;
}

export default function Diagnosis({ diagnosis }: Props) {
  return (
    <p className="diagnosis-text">
      <strong>Diagnosis:</strong> {diagnosis}
    </p>
  );
}
