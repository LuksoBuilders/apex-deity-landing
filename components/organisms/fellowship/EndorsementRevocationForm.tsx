import styled from "styled-components";
import { useState } from "react";

import { Button } from "../../molecules";
import { ValueSelector } from "../general";

const EndorsementRevocationFormContainer = styled.div``;

const EndorsementRevocationContent = styled.div`
  padding: 1em;
`;

const Info = styled.p`
  margin-bottom: 0.5em;
`;

const EndorsementRevocationSection = styled.div`
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

const EndorsementRevocationAction = styled.div`
  //border-top: 1px solid #383838;
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 1em;
`;

interface EndorsementRevocationFormProps {}

export const EndorsementRevocationForm =
  ({}: EndorsementRevocationFormProps) => {
    const [amount, setAmount] = useState(0);

    const available = 5;

    return (
      <EndorsementRevocationFormContainer>
        <EndorsementRevocationContent>
          <Info>
            If you already used your BackerBucks to endorse the Artisan, here
            you can get back your endorsed tokens.
          </Info>
          <EndorsementRevocationSection>
            <BalanceInfo>
              Available to revoke: <Red>{available} $ALY</Red>
            </BalanceInfo>
            <ValueSelector
              maxValue={available}
              value={amount}
              setValue={setAmount}
            />
          </EndorsementRevocationSection>
        </EndorsementRevocationContent>

        <EndorsementRevocationAction>
          <Button
            size="small"
            disabled={amount <= 0}
            color="primary"
            variant="contained"
          >
            {amount <= 0 ? `Revoke` : `Revoke and receive ${amount} $ALY`}
          </Button>
        </EndorsementRevocationAction>
      </EndorsementRevocationFormContainer>
    );
  };
