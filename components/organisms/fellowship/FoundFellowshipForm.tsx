import { useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { Spacing } from "../../atoms";
import { Button } from "../../molecules";
import { Deity } from "../../types/remoteTypes";
import { useApolloClient } from "@apollo/client";

import { UniversalProfileInput, Modal } from "../general";

import { DeitySelector } from "./DeitySelector";
import { useExtention, bytes32ToNumber } from "../../hooks/useExtension";

const FoundFellowshipFormContainer = styled.div`
  //border: 1px solid #f1f1f1;
  //padding: 1em 1.5em;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #393939;
`;

const Paragraph = styled.p`
  color: #393939;
  font-weight: 300;
`;

const Important = styled.span`
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.primary};
`;

const ArtisanDataContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ArtisanUsername = styled.h4`
  margin-left: 0.5em;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SuccessMessageContainer = styled.div`
  padding: 1em;
`;

interface FoundFellowshipFormProps {}

export const FoundFellowshipForm = ({}: FoundFellowshipFormProps) => {
  const client = useApolloClient();
  const [founding, setFounding] = useState(false);
  const [success, setSuccess] = useState(false);
  const { connectedAccount, foundFellowship } = useExtention();

  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [universalProfileAddress, setUPA] = useState("");

  const canFound =
    ethers.utils.isAddress(universalProfileAddress.toLowerCase()) &&
    selectedDeity !== null;

  if (!connectedAccount) {
    return (
      <FoundFellowshipFormContainer>
        <Title>You are not connected</Title>
        <Paragraph>
          For founding a Fellowship you need to connect with your Universal
          Profile first.
        </Paragraph>
      </FoundFellowshipFormContainer>
    );
  }

  return (
    <FoundFellowshipFormContainer>
      <Title>Found a Fellowship</Title>
      <Spacing spacing="1em" />
      <Paragraph>
        You can found a fellowship for any UP address you want. The UP address
        would be the artisan which controlls the fellowship, while your deity
        become it's founder.
      </Paragraph>
      <Spacing spacing="0.5em" />

      <Paragraph>
        Your founder deity will receive fee from the fellowship till the end of
        the time.
      </Paragraph>
      <Spacing spacing="0.5em" />
      <Paragraph>
        Your deity will use one of its <Important>slots</Important>. The slot
        will go on a cooldown for a week.
      </Paragraph>
      <Spacing spacing="2em" />

      <DeitySelector
        userAddress={connectedAccount}
        selectedDeity={selectedDeity}
        setSelectedDeity={setSelectedDeity}
      />

      <Spacing spacing="2em" />
      <UniversalProfileInput
        address={universalProfileAddress}
        setAddress={(v: string) => setUPA(v)}
        label="Artisan Universal Profile Address"
      />

      <Spacing spacing="5em" />

      <ActionButtonContainer>
        <Button
          onClick={async () => {
            if (selectedDeity) {
              const availableSlots = selectedDeity.slots.find(
                (slot) =>
                  Number(slot.usedAt) * 1000 <
                  Number(new Date()) - 7 * 24 * 3600 * 1000
              );
              if (availableSlots) {
                try {
                  setFounding(true);
                  await foundFellowship(
                    Number(selectedDeity.tokenIdNumber),
                    Number(availableSlots.index),
                    universalProfileAddress
                  );
                  await client.resetStore();
                  setSuccess(true);
                  setSelectedDeity(null);
                  setUPA("");
                  setFounding(false);
                } catch (err) {
                  console.error(err);
                  setFounding(false);
                }
              }
            }
          }}
          disabled={!canFound || founding}
          variant="contained"
          color="primary"
        >
          {founding ? "Founding ..." : "Found"}
        </Button>
      </ActionButtonContainer>
      <Modal
        title="Founding Success"
        open={success}
        onClose={() => setSuccess(false)}
      >
        <SuccessMessageContainer>
          <Paragraph>Fellowship got founded successfully.</Paragraph>
        </SuccessMessageContainer>
      </Modal>
    </FoundFellowshipFormContainer>
  );
};
