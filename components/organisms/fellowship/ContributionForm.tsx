import styled from "styled-components";
import { useState } from "react";

import { Button } from "../../molecules";
import { ValueSelector } from "../general";

const ContributionFormContainer = styled.div``;

const ContributionContent = styled.div`
  padding: 1em;
`;

const Info = styled.p`
  margin-bottom: 0.5em;
`;

const ContributionSection = styled.div`
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

const ContributionAction = styled.div`
  //border-top: 1px solid #383838;
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 1em;
`;

interface ContributionFormProps {}

export const ContributionForm = ({}: ContributionFormProps) => {
  const [amount, setAmount] = useState(0);

  return (
    <ContributionFormContainer>
      <ContributionContent>
        <Info>
          Contribution is the act of <b>burning</b> tokens for the sake of the
          fellowship. Burning a backerbuck <b>reduces the supply</b> of the
          fellowship, so it makes them more valuable.
        </Info>
        <Info>
          Contribution is the ultimate support of a fellowship, so{" "}
          <b>Artisans</b> provides the best benefits for their contributors.
        </Info>
        <Info>
          When you contribute a backerbuck, you will receive a{" "}
          <b>soulbounded contribution token</b>, and{" "}
          <b>you will lose the orginal backerbuck.</b>
        </Info>
        <ContributionSection>
          <BalanceInfo>
            Your Balance: <Red>5 $ALY</Red>
          </BalanceInfo>
          <ValueSelector value={amount} setValue={setAmount} />
        </ContributionSection>
      </ContributionContent>

      <ContributionAction>
        <Button
          size="small"
          disabled={amount <= 0}
          color="primary"
          variant="contained"
        >
          {amount <= 0 ? `Contribute` : `Contribute ${amount} $ALY`}
        </Button>
      </ContributionAction>
    </ContributionFormContainer>
  );
};
