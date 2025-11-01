import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const Container = styled.div`
  position: relative;
  z-index: 1001;
  margin-bottom: 15px;

  text-align: center;
`;

const ToggleButton = styled.button`
  background-color: #bfdcc5;
  color: #25532e;
  font-style: italic;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease, border-color 0.25s;

  &:hover {
    background-color: #c2e5c9;
    border-color: #646cff;
  }

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const Chevron = styled(FaChevronDown)<{ $expanded: boolean }>`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.$expanded ? "180deg" : "0deg")});
`;

const Drawer = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background-color: #3f4f3b;
  border: 2px solid #6e8d73;
  border-radius: 10px;
  padding: 1rem;
  z-index: 1002;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
`;

const PlantText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  line-height: 1.4;
`;

const Backdrop = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

export default function SupportedPlants() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <>
      <Backdrop $visible={expanded} onClick={() => setExpanded(false)} />
      <Container>
        <ToggleButton onClick={toggleExpanded}>
          <span>🌿 Supported Plant Leaf Types</span>
          <Chevron $expanded={expanded} />
        </ToggleButton>
        {expanded && (
          <Drawer>
            <PlantText>
              Apple, Blueberry, Cherry (including sour cherry), Corn (maize),
              Grape, Orange, Peach, Pepper (bell), Potato, Raspberry, Soybean,
              Squash, Strawberry, Tomato.
            </PlantText>
          </Drawer>
        )}
      </Container>
    </>
  );
}
