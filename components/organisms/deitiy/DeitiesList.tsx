import styled from "styled-components";
import Link from "next/link";
import { Deity } from "../../types/remoteTypes";
import { RedSpan, PaddedContainer } from "../../atoms";
import { ipfsURLtoNormal, isWeekSinceUsed } from "../../utils";
import { CircledImage } from "../../atoms";
import { ethers } from "ethers";

const DeitiesListContainer = styled.div``;

interface Lastable {
  $isLast: boolean;
}

const DeityMainInfo = styled.h2`
  font-size: 28px;
  font-weight: 800;
  font-style: italic;
`;

const DeityId = styled.span`
  margin-left: 0.5em;
  color: #383838;
  font-weight: 400;
`;

const DeityItemContainer = styled(PaddedContainer)<Lastable>`
  display: block;
  border-bottom: ${({ $isLast }) => ($isLast ? "0px" : "1px")} solid #888;
  padding-bottom: ${({ $isLast }) => ($isLast ? "em" : "1em")};
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const DeityItemLayout = styled.div`
  display: flex;
`;

const UninitializedDeityHeader = styled.h3``;

const DeityItemInformation = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DeityItemMainInfo = styled.h3`
  font-size: 28px;
`;

const DeityItemSecondaryInfoSection = styled.div``;

const DeityItemSecondaryInfo = styled.h5`
  font-weight: 400;
  font-size: 19px;
`;

const DeityDescription = styled.p`
  margin-top: 1em;
`;

interface DeitiesListProps {
  deities: Array<Deity>;
}

export const DeitiesList = ({ deities }: DeitiesListProps) => {
  const renderDeityItem = (deity: Deity, isLast: boolean) => {
    console.log(deity);

    const availableSlots = deity.slots
      .map((slot) => new Date(Number(slot.usedAt) * 1000))
      .map((usedAts) => isWeekSinceUsed(usedAts))
      .filter((isAWeekAfter) => isAWeekAfter);

    return (
      <Link href={`/deities/${deity.id}`}>
        <DeityItemContainer
          //
          $isLast={isLast}
        >
          <DeityItemLayout>
            <CircledImage
              width="200px"
              height="200px"
              squared
              src={ipfsURLtoNormal(deity.metadata.images[0]?.[0].url, 0)}
            />
            <DeityItemInformation>
              <DeityMainInfo>
                {deity.tier.toUpperCase()}. {deity.metadata.name}{" "}
                <DeityId>#{deity.tokenIdNumber}</DeityId>
              </DeityMainInfo>{" "}
              <DeityItemSecondaryInfoSection>
                <DeityItemSecondaryInfo>
                  Divine Tribute:{" "}
                  <RedSpan>
                    {Number(
                      ethers.utils.formatEther(deity.withdrawable)
                    ).toFixed(3)}{" "}
                    $LYX
                  </RedSpan>{" "}
                </DeityItemSecondaryInfo>

                <DeityItemSecondaryInfo>
                  Owner: <RedSpan>{deity.owner.profile.name}</RedSpan>{" "}
                </DeityItemSecondaryInfo>
                <DeityItemSecondaryInfo>
                  Slots:{" "}
                  <RedSpan>
                    {availableSlots.length}/{deity.slots.length}
                  </RedSpan>
                </DeityItemSecondaryInfo>
                <DeityItemSecondaryInfo>
                  XP: <RedSpan>{deity.level}</RedSpan>
                </DeityItemSecondaryInfo>
                <DeityItemSecondaryInfo>
                  Level: <RedSpan>{deity.level}</RedSpan>
                </DeityItemSecondaryInfo>
              </DeityItemSecondaryInfoSection>
            </DeityItemInformation>
          </DeityItemLayout>
          <DeityDescription>{deity.metadata.description}</DeityDescription>
        </DeityItemContainer>
      </Link>
    );
  };

  const renderNoDeities = () => {
    return (
      <PaddedContainer>This deity has not founded a deity yet.</PaddedContainer>
    );
  };

  return (
    <DeitiesListContainer>
      {deities?.length > 0
        ? [...deities]
            .sort((a, b) => {
              const aA = Number(
                Number(ethers.utils.formatEther(a.withdrawable)).toFixed(3)
              );
              const bB = Number(
                Number(ethers.utils.formatEther(b.withdrawable)).toFixed(3)
              );

              return bB - aA;
            })
            .map((deity, i) => (
              <div key={deity.id}>
                {renderDeityItem(deity, i == deities.length - 1)}
              </div>
            ))
        : renderNoDeities()}
    </DeitiesListContainer>
  );
};
