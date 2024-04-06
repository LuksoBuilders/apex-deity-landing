import styled from "styled-components";
import Image from "next/image";
import { ethers } from "ethers";
import { useState } from "react";

import { Button } from "../../molecules";

import { ShittableText } from "./ShittableText";

export const DeityCardContainer = styled.div`
  display: inline-block;
  border: 2px solid black;
  padding: 0.75em 1em 1em;
  background-color: white;
  margin-bottom: 2em;
`;

export const DeityCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

export const DeityTier = styled.span`
  font-weight: 700;
`;

export const DeityTitle = styled.h1`
  font-size: 28px;
  font-weight: 400;
`;

export const DeityOwner = styled.p`
  font-size: 14px;
  color: #969696;
`;

export const DeityImageContainer = styled.div`
  border: 2px solid black;
  display: inline-block;
`;

export const DeityMetadata = styled.div`
  margin-top: 0.5em;
`;

export const DeityRank = styled.div`
  font-size: 21px;
  font-weight: 600;
  text-align: left;
`;

export const DeitySecondary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DeitySecondaryInfo = styled.p`
  font-weight: 300;
  font-size: 13px;
`;

export interface DeityCardProps {
  tier: string;
  name: string;
  owner: string;
  image: string;
  shitAmount: number;
  lastShitTime: ethers.BigNumber | undefined;
  onShit: () => Promise<void>;
}

export const DeityShitCard = ({
  tier,
  name,
  owner,
  image,
  shitAmount,
  lastShitTime,
  onShit,
}: DeityCardProps) => {
  const [refetchCounter, setRefetchCounter] = useState(0);
  const [farming, setFarming] = useState(false);

  const refetch = () => {
    setRefetchCounter(refetchCounter + 1);
  };

  const renderButton = () => {
    if (lastShitTime === undefined) {
      return <Button fullwidth={true}>Loading Cooldown</Button>;
    } else {
      const lastShitTimeDate = new Date(Number(lastShitTime) * 1000);

      const isCoolDowned =
        Number(new Date()) - Number(lastShitTimeDate) >= 24 * 3600 * 1000;

      if (isCoolDowned) {
        return (
          <Button
            onClick={async () => {
              try {
                setFarming(true);
                await onShit();
                setFarming(false);
              } catch (err) {
                console.error(err);
                setFarming(false);
              }
            }}
            variant="contained"
            color="primary"
            fullwidth={true}
          >
            {farming ? "Farming ..." : `Farm ${shitAmount} $HolyShit`}
          </Button>
        );
      } else {
        return (
          <Button onClick={() => onShit()} fullwidth={true}>
            Shittable in: 
            <ShittableText
              expiryTimestamp={
                new Date(Number(lastShitTimeDate) + 24 * 3600 * 1000)
              }
              refetch={refetch}
            />
          </Button>
        );
      }
    }
  };

  return (
    <DeityCardContainer>
      <DeityCardHeader>
        <DeityTitle>
          <DeityTier>{tier}.</DeityTier> {name}
        </DeityTitle>
        <DeityOwner>#{owner}</DeityOwner>
      </DeityCardHeader>
      <DeityImageContainer>
        <Image
          width={300}
          height={300}
          unoptimized={true}
          alt={name}
          src={image}
        />
      </DeityImageContainer>

      <DeityMetadata>{renderButton()}</DeityMetadata>
    </DeityCardContainer>
  );
};
