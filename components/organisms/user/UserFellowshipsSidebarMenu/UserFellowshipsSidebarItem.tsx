import styled from "styled-components";
import { Fellowship } from "../../../types/remoteTypes";
import { ethers } from "ethers";
import Link from "next/link";
import { ipfsURLtoNormal } from "../../../utils";

const UserFellowshipsSidebarListItemContainer = styled(Link)`
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

const FellowshipImage = styled.img`
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

const FellowshipTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const FellowshipLevel = styled.h5`
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
  font-weight: 300;
  font-size: 14px;
`;

const Important = styled.b``;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
`;

interface UserFellowshipsSidebarListItemProps {
  fellowship: Fellowship;
}

export const UserFellowshipsSidebarListItem = ({
  fellowship,
}: UserFellowshipsSidebarListItemProps) => {
  if (!fellowship.metadata)
    return (
      <div>
        <UserFellowshipsSidebarListItemContainer
          href={`/fellowship/${fellowship.address}/initialization`}
        >
          <InfoSection>
            <MainRow>
              <MainRowPrimary>
                <FellowshipTitle>
                  <Red>Unintialized Fellowship</Red>
                </FellowshipTitle>
              </MainRowPrimary>
            </MainRow>
            <InfoRow>
              <InfoItem>
                Founder:{" "}
                <Important>
                  <Red>{fellowship.founder.metadata?.name}</Red>
                </Important>
              </InfoItem>
            </InfoRow>
          </InfoSection>
        </UserFellowshipsSidebarListItemContainer>
      </div>
    );

  if (fellowship.info) {
    return (
      <UserFellowshipsSidebarListItemContainer
        href={`/fellowship/${fellowship.address}`}
      >
        <ImageSection>
          <FellowshipImage
            src={ipfsURLtoNormal(
              fellowship.info.images[0]?.[fellowship.info.images[0].length - 1]
                .url,
              1
            )}
          />
        </ImageSection>
        <InfoSection>
          <MainRow>
            <MainRowPrimary>
              <FellowshipTitle>{fellowship.name}</FellowshipTitle>
            </MainRowPrimary>
          </MainRow>
          <InfoRow>
            <InfoItem>
              Mint Price:{" "}
              <Important>
                <Red>
                  {Number(
                    ethers.utils.formatEther(fellowship.currentPrice)
                  ).toFixed(3)}{" "}
                  $LYX
                </Red>
              </Important>
            </InfoItem>
          </InfoRow>

          <InfoRow>
            <InfoItem>
              TotalSupply: <Important>{fellowship.totalSupply}</Important>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              Founder:{" "}
              <Important>
                <Red>{fellowship.founder.metadata.name}</Red>
              </Important>
            </InfoItem>
          </InfoRow>
        </InfoSection>
      </UserFellowshipsSidebarListItemContainer>
    );
  }
  return <div>Intiaialized Fellowship</div>;
};

{
  /*  */
}
