import styled from "styled-components";
import { Button } from "../../molecules";
import { Modal, ValueSelector } from "../general";
import { useState } from "react";
import { ContributionForm } from "./ContributionForm";
import { PurificatioForm } from "./PurificatioForm";
import { EndorsementForm } from "./EndorsementForm";
import { EndorsementRevocationForm } from "./EndorsementRevocationForm";

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

interface BackerBuckPanelProps {}

export const BackerBuckPanel = ({}: BackerBuckPanelProps) => {
  const [mintValue, setMintValue] = useState(0);

  const [contributeModal, setContributeModal] = useState(false);
  const [purifyModal, setPurifyModal] = useState(false);
  const [endorsementModal, setEndorsementModal] = useState(false);
  const [revokationModal, setRevokeModal] = useState(false);

  return (
    <BackerBuckPanelContainer>
      <Overlay>
        <MintSection>
          <InfoRow>
            <InfoCol>
              <Info>
                Total Supply: <Red>10 $ALY</Red>
              </Info>
            </InfoCol>
            <InfoCol>
              <Info>
                Current Mint Price: <Red>10 $LYX</Red>
              </Info>
            </InfoCol>
          </InfoRow>
          <InfoRow>
            <InfoCol>
              <Info>
                Your Balance: <Red>5 $ALY</Red>
              </Info>
            </InfoCol>
            <InfoCol>
              <Minter>
                <ValueSelector
                  value={mintValue}
                  setValue={setMintValue}
                  maxValue={5}
                />

                <Button disabled variant="contained" color="primary">
                  Mint for {24.2} $LYX
                </Button>
              </Minter>
            </InfoCol>
          </InfoRow>
        </MintSection>

        <InfoDivider />
        <InfoRow>
          <InfoCol>
            <Info>
              Your Contributions: <Red>3 $ALY</Red>
            </Info>
          </InfoCol>
          <InfoCol>
            <ActionsList>
              <Button
                onClick={() => setPurifyModal(true)}
                variant="outlined"
                color="black"
              >
                Purify
              </Button>
              <Button
                onClick={() => setContributeModal(true)}
                variant="contained"
                color="black"
              >
                Contribute
              </Button>
            </ActionsList>
          </InfoCol>
        </InfoRow>
        <InfoRow>
          <InfoCol>
            <Info>
              Your Endorsements: <Red>10 $ALY</Red>
            </Info>
          </InfoCol>
          <InfoCol>
            <ActionsList>
              <Button
                onClick={() => setRevokeModal(true)}
                variant="outlined"
                color="black"
              >
                Revoke
              </Button>
              <Button
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
              Secondary Market <Red>(SOON)</Red>
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
        <ContributionForm />
      </Modal>
      <Modal
        title="Purification"
        open={purifyModal}
        onClose={() => setPurifyModal(false)}
      >
        <PurificatioForm />
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
