import styled from "styled-components";
import Link from "next/link";
import { ipfsURLtoNormal } from "../../../utils";
import { Deity } from "../../../types/remoteTypes";
import { ethers } from "ethers";

const UserDeitiesSidebarListItemContainer = styled(Link)`
  display: flex;
  width: 100%;
`;

const ImageSection = styled.div`
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 1px solid #e8e8e8;
  padding: 5px;
`;

const DeityImage = styled.img`
  height: 100%;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0px 1em;
  width: 100%;
`;

const MainRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MainRowPrimary = styled.div`
  display: flex;
  align-items: center;
`;

const DeityTitle = styled.h5`
  font-size: 16px;
  font-weight: 600;
`;

const DeityLevel = styled.h5`
  font-size: 13px;
  font-weight: 500;
  border: 2px solid #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 100px;
  margin-left: 4px;
  background-color: white;
`;

const MainRowSecondary = styled.div``;

const XPText = styled.h6`
  font-size: 14px;
  font-style: italic;
`;

const XPAmount = styled.span`
  font-weight: 400;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoItem = styled.p`
  font-style: italic;
  font-size: 14px;

  font-weight: 300;
`;

const Important = styled.b``;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
`;

interface UserDeitiesSidebarListItemProps {
  deity: Deity;
}

export const UserDeitiesSidebarListItem = ({
  deity,
}: UserDeitiesSidebarListItemProps) => {
  const availableSlots = deity.slots.filter(
    (slot) =>
      Number(slot.usedAt) * 1000 < Number(new Date()) - 7 * 24 * 3600 * 1000
  );

  return (
    <UserDeitiesSidebarListItemContainer href={`/deities/${deity.id}`}>
      <ImageSection>
        <DeityImage
          src={ipfsURLtoNormal(String(deity.metadata?.images?.[0]?.[3]?.url))}
        />
      </ImageSection>
      <InfoSection>
        <MainRow>
          <MainRowPrimary>
            <DeityTitle>
              {deity.tier.toUpperCase()}. {deity.metadata?.name}
            </DeityTitle>
            <DeityLevel>{deity.level}</DeityLevel>
          </MainRowPrimary>
          <MainRowSecondary>
            <XPText>
              <XPAmount>{deity.xp}</XPAmount> XP
            </XPText>
          </MainRowSecondary>
        </MainRow>
        <div>
          <InfoRow>
            <InfoItem>
              Slots: <Important>{availableSlots.length}</Important>/
              {deity.slots.length}
            </InfoItem>
            <InfoItem>
              <Important>{deity.portfolio.length}</Important> FSP
            </InfoItem>
          </InfoRow>

          <InfoRow>
            <InfoItem>
              Rank: <Important>{/*deity.rank*/}N/A</Important>
            </InfoItem>
            <InfoItem>
              <Important>
                <Red>{ethers.utils.formatEther(deity.withdrawable)} $LYX</Red>
              </Important>
            </InfoItem>
          </InfoRow>
        </div>
      </InfoSection>
    </UserDeitiesSidebarListItemContainer>
  );
};
