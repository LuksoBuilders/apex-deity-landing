import styled from "styled-components";
import { useState } from "react";
import { ethers } from "ethers";

import { Button } from "../../molecules";
import { ValueSelector } from "../general";

const PurificatioFormContainer = styled.div``;

const PurificatioContent = styled.div`
  padding: 1em;
`;

const Info = styled.p`
  margin-bottom: 0.5em;
`;

const PurificatioSection = styled.div`
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

const PurificatioAction = styled.div`
  //border-top: 1px solid #383838;
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 1em;
`;

const ErrorContainer = styled.div`
  padding: 1em;
  color: ${({ theme }) => theme.error};
`;

interface PurificatioFormProps {}

export const PurificatioForm = ({}: PurificatioFormProps) => {
  const [amount, setAmount] = useState(0);

  const holyshitBalance = ethers.utils.parseEther("300");
  const available = 5;

  return (
    <PurificatioFormContainer>
      <PurificatioContent>
        <Info>
          By sacrificing <b>100 $HolyShit</b> you can purify your contributed
          tokens and get them back.
        </Info>
        <Info>You can only purify the tokens you contributed.</Info>
        <PurificatioSection>
          <BalanceInfo>
            Available Contributions: <Red>{available} $ALY</Red>
          </BalanceInfo>
          <ValueSelector
            maxValue={available}
            value={amount}
            setValue={setAmount}
          />
        </PurificatioSection>
      </PurificatioContent>

      <PurificatioAction>
        <Button
          size="small"
          disabled={
            amount <= 0 ||
            holyshitBalance.lt(ethers.utils.parseEther(String(amount * 100)))
          }
          color="primary"
          variant="contained"
        >
          {amount <= 0
            ? `Purify`
            : `Purify ${amount} $ALY for ${amount * 100} $HolyShit`}
        </Button>
      </PurificatioAction>

      {holyshitBalance.lt(ethers.utils.parseEther(String(amount * 100))) && (
        <ErrorContainer>You don&apos;t have enough HolyShits!</ErrorContainer>
      )}
    </PurificatioFormContainer>
  );
};
