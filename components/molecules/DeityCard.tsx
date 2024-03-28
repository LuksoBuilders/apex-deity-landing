import styled from "styled-components";
import Image from "next/image";

export const DeityCardContainer = styled.div`
  display: inline-block;
  border: 2px solid black;
  padding: 0.75em 1em 1em;
  background-color: white;
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
  rank: number;
  founded: number;
  collected: number;
}

export const DeityCard = ({
  tier,
  name,
  owner,
  image,
  rank,
  founded,
  collected,
}: DeityCardProps) => {
  return (
    <DeityCardContainer>
      <DeityCardHeader>
        <DeityTitle>
          <DeityTier>{tier}.</DeityTier> {name}
        </DeityTitle>
        <DeityOwner>@{owner}</DeityOwner>
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

      <DeityMetadata>
        <DeityRank>Rank: {rank}</DeityRank>
        <DeitySecondary>
          <DeitySecondaryInfo>Founded: {founded} Fellowship</DeitySecondaryInfo>
          <DeitySecondaryInfo>Collected: {collected} $LYX</DeitySecondaryInfo>
        </DeitySecondary>
      </DeityMetadata>
    </DeityCardContainer>
  );
};
