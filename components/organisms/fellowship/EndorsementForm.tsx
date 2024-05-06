import styled from "styled-components";
import { useState } from "react";

import { Button } from "../../molecules";
import { ValueSelector } from "../general";

const EndorsementFormContainer = styled.div``;

const EndorsementContent = styled.div`
  padding: 1em;
`;

const Info = styled.p`
  margin-bottom: 0.5em;
`;

const EndorsementSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
`;

const Selector = styled.div``;

const BalanceInfo = styled.h3`
  font-weight: 400;
  font-size: 19px;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 19px;
  //font-style: italic;
`;

const EndorsementAction = styled.div`
  //border-top: 1px solid #383838;
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 1em;
`;

interface EndorsementFormProps {}

export const EndorsementForm = ({}: EndorsementFormProps) => {
  const [amount, setAmount] = useState(0);

  const available = 5;

  return (
    <EndorsementFormContainer>
      <EndorsementContent>
        <Info>
          Endorsement is the basic action that you can do with your{" "}
          <b>BackerBucks</b>. Artisan will provide some benefits for their
          endorsers.
        </Info>
        <Info>
          Tokens you endorse, can be revoked and <b>you can</b> get your orginal
          BackerBucks back.
        </Info>
        <EndorsementSection>
          <BalanceInfo>
            Your Balance: <Red>{available} $ALY</Red>
          </BalanceInfo>
          <ValueSelector
            maxValue={available}
            value={amount}
            setValue={setAmount}
          />
        </EndorsementSection>
      </EndorsementContent>

      <EndorsementAction>
        <Button
          size="small"
          disabled={amount <= 0}
          color="primary"
          variant="contained"
        >
          {amount <= 0 ? `Endorse` : `Endorse ${amount} $ALY`}
        </Button>
      </EndorsementAction>
    </EndorsementFormContainer>
  );
};
