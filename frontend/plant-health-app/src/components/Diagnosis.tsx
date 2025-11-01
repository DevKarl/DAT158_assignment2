import styled from "styled-components";

interface Props {
  diagnosis: string | null;
}

export default function Diagnosis({ diagnosis }: Props) {
  return (
    <DiagnosisText>
      <strong>Backend response:</strong> {diagnosis}
    </DiagnosisText>
  );
}

const DiagnosisText = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: white;
`;
