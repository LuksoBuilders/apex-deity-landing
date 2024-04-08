import styled from "styled-components";
import { useEffect } from "react";
import { MintSelectorProps } from "../utils/interfaces";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.75em;
  display: flex;
  justify-content: space-between;
`;

const TierHolder = styled.div`
  border: 4px solid black;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  border-radius: 1000px;
`;

const AvailablityHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: 300;
`;

const AvailabilityCount = styled.p`
  margin-left: 0.5em;
  font-weight: 500;
`;

const Available = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SelectorHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectorButton = styled.div`
  border: 2px solid black;
  width: 36px;
  height: 36px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: 2ms;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const SelectorValue = styled.div`
  min-width: 60px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

export const MintSelector = ({
  tier,
  value,
  setValue,
  available,
}: MintSelectorProps) => {
  useEffect(() => {}, [available, value]);

  return (
    <Container>
      <TierHolder>{tier}</TierHolder>
      <AvailablityHolder>
        Available:{" "}
        <AvailabilityCount>
          <Available>{available - value}</Available> / 25
        </AvailabilityCount>
      </AvailablityHolder>
      <SelectorHolder>
        <SelectorButton
          onClick={() => (value > 0 ? setValue(value - 1) : null)}
        >
          -
        </SelectorButton>
        <SelectorValue>{value}</SelectorValue>
        <SelectorButton
          onClick={() => (available > value ? setValue(value + 1) : null)}
        >
          +
        </SelectorButton>
      </SelectorHolder>
    </Container>
  );
};
