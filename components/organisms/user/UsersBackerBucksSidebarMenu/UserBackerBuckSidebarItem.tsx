import styled from "styled-components";
import { BackerBuck } from "../../../types/remoteTypes";
import { ethers } from "ethers";
import Link from "next/link";
import { ipfsURLtoNormal } from "../../../utils";

const UserBackerBucksSidebarListItemContainer = styled(Link)`
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

const BackerBuckImage = styled.img`
  max-height: 100%;
  width: 90px;
`;

const InfoSection = styled.div`
  padding: 0px 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const BackerBuckTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const BackerBuckLevel = styled.h5`
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

interface UserBackerBucksSidebarListItemProps {
  backerBuck: BackerBuck;
}

export const UserBackerBucksSidebarListItem = ({
  backerBuck,
}: UserBackerBucksSidebarListItemProps) => {
  console.log(backerBuck.fellowship.info, backerBuck.fellowship.info.images[0]);

  const targetImageUrl =
    backerBuck.fellowship.info.images[0]?.[
      backerBuck.fellowship.info.images[0].length - 1
    ].url;

  return (
    <UserBackerBucksSidebarListItemContainer
      href={`/fellowship/${backerBuck.fellowship.id}`}
    >
      <ImageSection>
        <BackerBuckImage
          src={ipfsURLtoNormal(
            targetImageUrl,
            targetImageUrl.replace("ipfs://", "").startsWith("b") ? 0 : 1
          )}
        />
      </ImageSection>
      <InfoSection>
        <MainRow>
          <MainRowPrimary>
            <BackerBuckTitle>
              Amount:{" "}
              <Red>
                {backerBuck.amount} ${backerBuck.fellowship.symbol}
              </Red>
            </BackerBuckTitle>
          </MainRowPrimary>
        </MainRow>
        <div>
          <InfoRow>
            <InfoItem>
              Value:{" "}
              <Important>
                <Red>
                  {Number(
                    ethers.utils.formatEther(
                      ethers.BigNumber.from(
                        backerBuck.fellowship.currentPrice
                      ).mul(Number(backerBuck.amount))
                    )
                  ).toFixed(3)}{" "}
                  $LYX
                </Red>
              </Important>
            </InfoItem>
          </InfoRow>

          <InfoRow>
            <InfoItem>
              Mint Price:{" "}
              <Important>
                {
                  <Red>
                    {Number(
                      ethers.utils.formatEther(
                        ethers.BigNumber.from(
                          backerBuck.fellowship.currentPrice
                        )
                      )
                    ).toFixed(3)}{" "}
                    $LYX
                  </Red>
                }
              </Important>
            </InfoItem>
          </InfoRow>
        </div>
      </InfoSection>
    </UserBackerBucksSidebarListItemContainer>
  );
};
