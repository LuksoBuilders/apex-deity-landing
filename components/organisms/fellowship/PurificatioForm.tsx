import styled from "styled-components";
import { useState } from "react";
import { ethers } from "ethers";
import { gql, useQuery } from "@apollo/client";


import { Button } from "../../molecules";
import { ValueSelector } from "../general";
import { useExtention } from "../../hooks/useExtension";
import { useRouter } from "next/router";
import { User, BackerBuck, Fellowship } from "../../types/remoteTypes";


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GET_USER = gql`
  query User($userAddress: String!) {
    user(userAddress: $userAddress) {
      id
      backerBucks {
        id
        fellowship {
          id
          name
          symbol
          metadata
          info {
            images {
              url
            }
          }
        }
        owner {
          id
        }
        amount
        purifiable
        contributions
      }
      holyShitsBalance
    }
  }
`;

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

interface PurificatioFormProps {
  fellowship: Fellowship
}

export const PurificatioForm = ({ fellowship }: PurificatioFormProps) => {
  const [purifying, setPurifying] = useState(false)

  const { query } = useRouter();
  const { connectedAccount, purify } = useExtention();

  const { error, loading, data, refetch } = useQuery(GET_USER, {
    variables: { userAddress: connectedAccount },
  });

  const [amount, setAmount] = useState(0);



  if (error || loading) return <span></span>;

  const user: User = data.user;


  let targetBackerBuck: BackerBuck = user.backerBucks.find(
    (backerBuck) => backerBuck.fellowship.id === fellowship.id
  );
  if (!targetBackerBuck) {
    targetBackerBuck = { amount: 0 } as unknown as BackerBuck
  }


  const holyshitBalance = ethers.BigNumber.from(user.holyShitsBalance);


  const available = Number(targetBackerBuck.purifiable)


  console.log(user)

  return (
    <PurificatioFormContainer>
      <PurificatioContent>
        <Info>
          By sacrificing <b>100 $HolyShit</b> you can purify your contributed
          tokens and get them back.
        </Info>
        <Info>You can only purify the tokens you contributed.</Info>
        <PurificatioSection>
          <div>
            <BalanceInfo>
              Your $HolyShit Balance: <Red>{Number(ethers.utils.formatEther(user.holyShitsBalance)).toFixed(0)} $HSHT</Red>
            </BalanceInfo>
            <BalanceInfo>
              Purifiable Contributions: <Red>{targetBackerBuck.purifiable} ${fellowship.symbol}</Red>
            </BalanceInfo>

          </div>

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
            purifying ||
            amount <= 0 ||
            holyshitBalance.lt(ethers.utils.parseEther(String(amount * 100)))
          }
          color="primary"
          variant="contained"
          onClick={async () => {
            try {
              setPurifying(true)
              await purify(fellowship.contributionAddress, amount)
              refetch();
              await delay(2000)
              refetch();
              setAmount(0);
              setPurifying(false)
            } catch (err) {
              setPurifying(false)
            }
          }}
        >
          {purifying ? "Purifying" : amount <= 0
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
