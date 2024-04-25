import styled from "styled-components";
import { Deity } from "../../../types";

const UserDeitiesSidebarListItemContainer = styled.div`
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
  font-size: 19px;
  font-weight: 600;
`;

const DeityLevel = styled.h5`
  font-size: 15px;
  font-weight: 500;
  border: 2px solid #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  margin-left: 4px;
  background-color: white;
`;

const MainRowSecondary = styled.div``;

const XPText = styled.h6`
  font-size: 19px;
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
  return (
    <UserDeitiesSidebarListItemContainer>
      <ImageSection>
        <DeityImage src={deity.image} />
      </ImageSection>
      <InfoSection>
        <MainRow>
          <MainRowPrimary>
            <DeityTitle>
              {deity.tier.toUpperCase()}. {deity.name}
            </DeityTitle>
            <DeityLevel>{deity.level}</DeityLevel>
          </MainRowPrimary>
          <MainRowSecondary>
            <XPText>
              <XPAmount>{deity.xp}</XPAmount> XP
            </XPText>
          </MainRowSecondary>
        </MainRow>
        <InfoRow>
          <InfoItem>
            Slots: <Important>{deity.availableSlots}</Important>/{deity.slots}
          </InfoItem>
          <InfoItem>
            <Important>{deity.fellowships}</Important> FSP
          </InfoItem>
        </InfoRow>

        <InfoRow>
          <InfoItem>
            Rank: <Important>{deity.rank}</Important>
          </InfoItem>
          <InfoItem>
            <Important>
              <Red>{deity.harvestableAmount} $LYX</Red>
            </Important>
          </InfoItem>
        </InfoRow>
      </InfoSection>
    </UserDeitiesSidebarListItemContainer>
  );
};
