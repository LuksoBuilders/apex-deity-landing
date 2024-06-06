import styled from "styled-components";
import { useState } from "react";

import { Button } from "../../molecules";
import { ValueSelector } from "../general";

import { Fellowship, User, BackerBuck } from "../../types/remoteTypes";
import { gql, useQuery } from "@apollo/client";
import { useExtention } from "../../hooks/useExtension";


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
    }
  }
`;


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

interface ContributionFormProps {
  fellowship: Fellowship
}

export const ContributionForm = ({ fellowship }: ContributionFormProps) => {
  const [contributing, setContributing] = useState(false)
  const { connectedAccount, contribution } = useExtention();

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
            Your Balance: <Red>{targetBackerBuck.amount} $ALY</Red>
          </BalanceInfo>
          <ValueSelector
            maxValue={Number(targetBackerBuck.amount)}
            value={amount}
            setValue={setAmount}
          />
        </ContributionSection>
      </ContributionContent>

      <ContributionAction>
        <Button
          size="small"
          disabled={amount <= 0 || contributing}
          color="primary"
          variant="contained"
          onClick={async () => {
            console.log(fellowship)
            try {
              setContributing(true)
              await contribution(fellowship.id, fellowship.contributionAddress, amount)
              refetch();
              await delay(2000)
              refetch();
              setAmount(0);
              setContributing(false)
            } catch (err) {
              setContributing(false)
            }
          }}
        >
          {contributing ? "Contributing" : amount <= 0 ? `Contribute` : `Contribute ${amount} $ALY`}
        </Button>
      </ContributionAction>
    </ContributionFormContainer>
  );
};
