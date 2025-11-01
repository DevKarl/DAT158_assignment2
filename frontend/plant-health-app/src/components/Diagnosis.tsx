import styled from "styled-components";
import type DiagnosisResult from "../types/DIagnosisResult";

interface Props {
  diagnosis: DiagnosisResult;
}

const severityKeywords: Record<string, "good" | "moderate" | "bad"> = {
  healthy: "good",
  mildew: "bad",
  rust: "bad",
  scorch: "bad",
  mites: "bad",
  curl: "bad",
  mosaic: "bad",
  blight: "bad",
  bacterial: "bad",
  spot: "moderate",
  leaf: "moderate",
  measles: "moderate",
};

const getConditionSeverity = (
  condition: string
): "good" | "moderate" | "bad" => {
  const normalized = condition.toLowerCase();

  for (const keyword in severityKeywords) {
    if (normalized.includes(keyword)) {
      return severityKeywords[keyword];
    }
  }

  return "moderate"; // fallback
};

const DiagnosisContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: white;
`;

const Detail = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
  display: flex;
  font-weight: 800;
  flex-direction: column;
  gap: 0.25rem;
`;

const ConditionText = styled.span<{ $severity: "good" | "moderate" | "bad" }>`
  color: ${({ $severity }) =>
    $severity === "good"
      ? "#4caf50"
      : $severity === "moderate"
      ? "#fbc02d"
      : "#f44336"};
`;

export default function Diagnosis({ diagnosis }: Props) {
  const formattedCondition = diagnosis.healthStatus.replace(/_/g, " ");
  const severity = getConditionSeverity(formattedCondition);

  return (
    <DiagnosisContainer>
      <strong>Diagnosis Result:</strong>
      <Detail>
        <span>
          <strong>Type:</strong> {diagnosis.label}
        </span>
        <span>
          <strong>Condition:</strong>{" "}
          <ConditionText $severity={severity}>
            {formattedCondition} ({diagnosis.confidence}%)
          </ConditionText>
        </span>
      </Detail>
    </DiagnosisContainer>
  );
}
