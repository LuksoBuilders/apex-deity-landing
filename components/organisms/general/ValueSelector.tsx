import styled from "styled-components";

const ValueSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
`;

interface Disablable {
  $disabled: boolean;
}

const SelectorButton = styled.div<Disablable>`
  border: 2px solid ${({ $disabled }) => ($disabled ? "#c8c8c8" : "#383838")};
  color: ${({ $disabled }) => ($disabled ? "#c8c8c8" : "#383838")};
  background-color: ${({ $disabled }) => ($disabled ? "#fff" : "#fff")};
  width: 27px;
  height: 27px;
  font-size: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: 2ms;
  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? "#fff" : "#e8e8e8")};
  }
`;

const SelectorValue = styled.div`
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
`;

interface ValueSelectorProps {
  value: number;
  setValue: Function;
  maxValue?: number;
  steps?: number
  renderHelper?: (v: string) => string
}

export const ValueSelector = ({
  value,
  setValue,
  maxValue = Infinity,
  steps = 1,
  renderHelper = (v: string) => v
}: ValueSelectorProps) => {
  return (
    <ValueSelectorContainer>
      <SelectorButton
        $disabled={value <= 0}
        onClick={() => {
          if (value > 0) {
            setValue(value - steps);
          }
        }}
      >
        -
      </SelectorButton>
      <SelectorValue>{renderHelper(String(value))}</SelectorValue>
      <SelectorButton
        $disabled={value >= maxValue}
        onClick={() => {
          if (value < maxValue) {
            setValue(value + steps);
          }
        }}
      >
        +
      </SelectorButton>
    </ValueSelectorContainer>
  );
};
