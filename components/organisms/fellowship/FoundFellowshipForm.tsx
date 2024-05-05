import { useState } from "react";
import styled from "styled-components";

import { Spacing } from "../../atoms";
import { Button } from "../../molecules";

import { UniversalProfileInput } from "../general";

import { DeitySelector } from "./DeitySelector";
import { useUPBasicInfo } from "../../hooks";

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

interface FoundFellowshipFormProps {}

export const FoundFellowshipForm = ({}: FoundFellowshipFormProps) => {
  const [selectedDeity, setSelectedDeity] = useState<number | null>(null);
  const [universalProfileAddress, setUPA] = useState("");
  const artisan = useUPBasicInfo(universalProfileAddress);

  const canFound = artisan.data && selectedDeity !== null;

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
        <Button disabled={!canFound} variant="contained" color="primary">
          Found
        </Button>
      </ActionButtonContainer>
    </FoundFellowshipFormContainer>
  );
};
