import styled from "styled-components";
import { Button } from "../../molecules";
import { Modal, ValueSelector } from "../general";
import { useState } from "react";
import { ContributionForm } from "./ContributionForm";
import { PurificatioForm } from "./PurificatioForm";
import { EndorsementForm } from "./EndorsementForm";
import { EndorsementRevocationForm } from "./EndorsementRevocationForm";
import { gql, useQuery } from "@apollo/client";
import { CenteredDiv } from "../../atoms";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/router";
import { ethers, BigNumber } from "ethers";
import { Fellowship, User } from "../../types/remoteTypes";
import { useExtention } from "../../hooks/useExtension";

const GET_FELLOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      id
      name
      symbol
      address
      metadata
      info {
        assets {
          url
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          url
        }
        links {
          title
          url
        }
      }
      artisan {
        id
        profile {
          name
          profileImage {
            url
          }
        }
      }
      founder {
        id
        metadata {
          name
          images {
            url
          }
        }
      }
      backerBucks {
        id
      }
      contributionAddress
      contributions {
        id
      }
      endorsementAddress
      endorsements {
        id
      }
      currentPrice
      initialPrice
      priceGrowth
      totalSupply
      raisedAmount
      contributionAmount
      endorsementAmount
    }
  }
`;

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

const BackerBuckPanelContainer = styled.div`
  border: 1px solid #f4f4f4;
  //background-color: #fafafa;
  background-image: url("/background2.png");
  background-position: center center;
  background-size: cover;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Overlay = styled.div`
  background-color: rgba(248, 248, 248, 0.7);
  backdrop-filter: blur(0px);
`;

const InfoCol = styled.div``;

const MintSection = styled.div``;

const Info = styled.h3`
  font-weight: 400;
  font-size: 18px;
  padding: 1em;
`;

const InfoDivider = styled.div`
  border: 1px solid #f4f4f4;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 16px;
  font-style: italic;
`;

const Minter = styled.div`
  display: flex;
  padding: 0.5em 1em;
`;

const SelectorButton = styled.div`
  border: 2px solid black;
  width: 27px;
  height: 27px;
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

const ActionsList = styled.div`
  display: flex;
  padding: 0.5em 1em;
`;

interface BackerBuckPanelProps { }

function getMintPrice(
  currentSupply: BigNumber,
  amount: BigNumber,
  priceGrowth: BigNumber,
  initialPrice: BigNumber
): BigNumber {
  const CALCULATION_DENOMINATOR = BigNumber.from("10000"); // Example value, set it to the actual denominator

  const _backerbuckPriceGrowth = priceGrowth; // Example value, set it to the actual price growth
  const _backerbuckInitialPrice = initialPrice; // Example value, set it to the actual initial price

  const base = CALCULATION_DENOMINATOR.add(_backerbuckPriceGrowth);
  let currentSupplyPrice = _backerbuckInitialPrice;
  let totalPrice = BigNumber.from(0);

  console.log(String(currentSupply));

  for (let i = BigNumber.from(0); i.lt(currentSupply); i = i.add(1)) {
    currentSupplyPrice = currentSupplyPrice
      .mul(base)
      .div(CALCULATION_DENOMINATOR);
  }

  totalPrice = totalPrice.add(currentSupplyPrice);

  for (
    let i = currentSupply.add(1);
    i.lt(currentSupply.add(amount));
    i = i.add(1)
  ) {
    currentSupplyPrice = currentSupplyPrice
      .mul(base)
      .div(CALCULATION_DENOMINATOR);
    totalPrice = totalPrice.add(currentSupplyPrice);
  }

  return totalPrice;
}

interface UserBalanceProps {
  symbol: string;
}

export const UserBalance = ({ symbol }: UserBalanceProps) => {
  const { query } = useRouter();
  const { connectedAccount, mintBackerBuck } = useExtention();

  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userAddress: connectedAccount },
  });

  if (error || loading) return <span></span>;

  const user: User = data.user;

  const targetBackerBuck = user.backerBucks.find(
    (backerBuck) => backerBuck.fellowship.id === query.id
  );

  if (!targetBackerBuck) return <Red>0 ${symbol}</Red>;
  return (
    <Red>
      {targetBackerBuck.amount} ${symbol}
    </Red>
  );
};

export const UserContributions = ({ symbol }: UserBalanceProps) => {
  const { query } = useRouter();
  const { connectedAccount, mintBackerBuck } = useExtention();

  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userAddress: connectedAccount },
  });

  if (error || loading) return <span></span>;

  const user: User = data.user;

  const targetBackerBuck = user.backerBucks.find(
    (backerBuck) => backerBuck.fellowship.id === query.id
  );

  if (!targetBackerBuck) return <Red>0 ${symbol}</Red>;
  return (
    <Red>
      {targetBackerBuck.contributions} ${symbol}
    </Red>
  );
}

export const BackerBuckPanel = ({ }: BackerBuckPanelProps) => {
  const { query } = useRouter();
  const [minting, setMinting] = useState<boolean>(false);
  const [mintValue, setMintValue] = useState(0);
  const { connectedAccount, mintBackerBuck } = useExtention();

  const [contributeModal, setContributeModal] = useState(false);
  const [purifyModal, setPurifyModal] = useState(false);
  const [endorsementModal, setEndorsementModal] = useState(false);
  const [revokationModal, setRevokeModal] = useState(false);

  const { error, loading, data, client } = useQuery(GET_FELLOWSHIP, {
    variables: { fellowshipId: query.id },
  });

  if (loading || error) {
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );
  }

  const fellowship: Fellowship = data.fellowship;

  return (
    <BackerBuckPanelContainer>
      <Overlay>
        <MintSection>
          <InfoRow>
            <InfoCol>
              <Info>
                Total Supply:{" "}
                <Red>
                  {fellowship.totalSupply} ${fellowship.symbol}
                </Red>
              </Info>
            </InfoCol>
            <InfoCol>
              <Info>
                Current Mint Price:{" "}
                <Red>
                  {Number(
                    ethers.utils.formatEther(fellowship.currentPrice)
                  ).toFixed(4)}{" "}
                  $LYX
                </Red>
              </Info>
            </InfoCol>
          </InfoRow>
          <InfoRow>
            <InfoCol>
              {!connectedAccount ? (
                <Info>
                  Connect to Mint <Red>${fellowship.symbol}</Red>
                </Info>
              ) : (
                <Info>
                  Your Balance: <UserBalance symbol={fellowship.symbol} />
                </Info>
              )}
            </InfoCol>
            <InfoCol>
              <Minter>
                <ValueSelector value={mintValue} setValue={setMintValue} />

                <Button
                  disabled={!connectedAccount || mintValue === 0 || minting}
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    try {
                      setMinting(true);
                      await mintBackerBuck(
                        fellowship.address,
                        mintValue,
                        Number(fellowship.totalSupply)
                      );
                      await client.resetStore();
                      setMinting(false);
                      setMintValue(0);
                    } catch (err) {
                      setMinting(false);
                    }
                  }}
                >
                  {mintValue === 0
                    ? "Mint"
                    : ` Mint for
                  ${Number(
                      ethers.utils.formatEther(
                        getMintPrice(
                          ethers.BigNumber.from(fellowship.totalSupply),
                          BigNumber.from(mintValue),
                          BigNumber.from(150),
                          BigNumber.from(fellowship.initialPrice)
                        )
                      )
                    ).toFixed(2)}
                  $LYX`}
                </Button>
              </Minter>
            </InfoCol>
          </InfoRow>
          <InfoRow>
            <InfoCol>
              <Info>
                Total Raised Amount:{" "}
                <Red>
                  {Number(
                    ethers.utils.formatEther(fellowship.raisedAmount)
                  ).toFixed(1)}{" "}
                  $LYX
                </Red>
              </Info>
            </InfoCol>
          </InfoRow>
        </MintSection>

        <InfoDivider />
        <InfoRow>
          <InfoCol>
            {!connectedAccount ? (
              <Info>
                Connect to contribute
              </Info>
            ) : (
              <Info>
                Your Contributions:  <UserContributions symbol={fellowship.symbol} />
              </Info>
            )}

          </InfoCol>
          <InfoCol>
            <ActionsList>
              <Button
                onClick={() => setPurifyModal(true)}
                variant="outlined"
                color="black"
                disabled={!connectedAccount}
              >
                Purify
              </Button>
              <Button
                onClick={() => setContributeModal(true)}
                variant="contained"
                color="black"
                disabled={!connectedAccount}
              >
                Contribute
              </Button>
            </ActionsList>
          </InfoCol>
        </InfoRow>
        <InfoRow>
          <InfoCol>
            <Info>
              Your Endorsements: <Red>Soon</Red>
            </Info>
          </InfoCol>
          <InfoCol>
            <ActionsList>
              <Button
                disabled
                onClick={() => setRevokeModal(true)}
                variant="outlined"
                color="black"
              >
                Revoke
              </Button>
              <Button
                disabled
                onClick={() => setEndorsementModal(true)}
                variant="contained"
                color="black"
              >
                Endorse
              </Button>
            </ActionsList>
          </InfoCol>
        </InfoRow>
        <InfoRow>
          <InfoCol>
            <Info>
              Secondary Market <Red>SOON</Red>
            </Info>
          </InfoCol>
          <InfoCol>
            <ActionsList>
              <Button disabled variant="outlined" color="black">
                Sell
              </Button>
              <Button disabled variant="contained" color="black">
                Buy
              </Button>
            </ActionsList>
          </InfoCol>
        </InfoRow>
      </Overlay>
      <Modal
        title="Contribute"
        open={contributeModal}
        onClose={() => setContributeModal(false)}
      >
        <ContributionForm fellowship={fellowship} />
      </Modal>
      <Modal
        title="Purification"
        open={purifyModal}
        onClose={() => setPurifyModal(false)}
      >
        <PurificatioForm fellowship={fellowship} />
      </Modal>
      <Modal
        title="Endorsement"
        open={endorsementModal}
        onClose={() => setEndorsementModal(false)}
      >
        <EndorsementForm />
      </Modal>
      <Modal
        title="Endorsement Revocation"
        open={revokationModal}
        onClose={() => setRevokeModal(false)}
      >
        <EndorsementRevocationForm />
      </Modal>
    </BackerBuckPanelContainer>
  );
};
