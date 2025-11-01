import styled, { keyframes } from "styled-components";

interface ButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  onClick,
  loading = false,
  disabled = false,
  children,
  className = "",
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? <Spinner /> : <span>{children}</span>}
    </StyledButton>
  );
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 40px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #4caf50;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
