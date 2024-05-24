import styled from "styled-components";
import { ethers } from "ethers";
import { CircledImage } from "../../atoms";
import { Fellowship } from "../../types/remoteTypes";
import Link from "next/link";
import { CenteredDiv } from "../../atoms";
import { BounceLoader } from "react-spinners";
import { ipfsURLtoNormal } from "../../utils";
import { RedSpan, PaddedContainer } from "../../atoms";

const FellowshipListContainer = styled.div``;

interface Lastable {
  $isLast: boolean;
}

const FellowshipItemContainer = styled(PaddedContainer)<Lastable>`
  display: block;
  border-bottom: ${({ $isLast }) => ($isLast ? "0px" : "1px")} solid #888;
  padding-bottom: ${({ $isLast }) => ($isLast ? "em" : "1em")};
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const FellowshipItemLayout = styled.div`
  display: flex;
`;

const UninitializedFellowshipHeader = styled.h3``;

const FellowshipItemInformation = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FellowshipItemMainInfo = styled.h3`
  font-size: 28px;
`;

const FellowshipItemSecondaryInfoSection = styled.div``;

const FellowshipItemSecondaryInfo = styled.h5`
  font-weight: 400;
  font-size: 19px;
`;

interface FellowshipListProps {
  fellowships: Array<Fellowship>;
}

export const FellowshipsList = ({ fellowships }: FellowshipListProps) => {
  if (!fellowships) {
    return (
      <PaddedContainer>
        <CenteredDiv>
          <BounceLoader />
        </CenteredDiv>
      </PaddedContainer>
    );
  }

  console.log(fellowships);

  const renderFellowshipItem = (fellowship: Fellowship, isLast: boolean) => {
    if (!fellowship.metadata) {
      return (
        <FellowshipItemContainer
          //href={`/fellowship/${fellowship.address}`}
          $isLast={isLast}
        >
          <UninitializedFellowshipHeader>
            This Fellowship has not been initialized yet.
          </UninitializedFellowshipHeader>
          <FellowshipItemSecondaryInfo>
            Artisan: <RedSpan>{fellowship.artisan.profile.name}</RedSpan>
          </FellowshipItemSecondaryInfo>
          <FellowshipItemSecondaryInfo>
            Founder: <RedSpan>{fellowship.founder.metadata.name}</RedSpan>
          </FellowshipItemSecondaryInfo>
        </FellowshipItemContainer>
      );
    }
    return (
      <Link href={`/fellowship/${fellowship.address}`}>
        <FellowshipItemContainer
          //
          $isLast={isLast}
        >
          <FellowshipItemLayout>
            <CircledImage
              width="200px"
              height="200px"
              squared
              src={
                fellowship.info.images[0]?.[2]
                  ? ipfsURLtoNormal(fellowship.info.images[0]?.[2].url, 1)
                  : ipfsURLtoNormal(fellowship.info.images[0]?.[0].url, 0)
              }
            />
            <FellowshipItemInformation>
              <FellowshipItemMainInfo>
                {fellowship.name} - {fellowship.symbol}
              </FellowshipItemMainInfo>
              <FellowshipItemSecondaryInfoSection>
                <FellowshipItemSecondaryInfo>
                  Artisan: <RedSpan>{fellowship.artisan.profile.name}</RedSpan>{" "}
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Mint Price:
                  <RedSpan>
                    {" "}
                    {Number(
                      ethers.utils.formatEther(fellowship.currentPrice)
                    ).toFixed(3)}{" "}
                    $LYX
                  </RedSpan>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Founder: <RedSpan>{fellowship.founder.metadata.name}</RedSpan>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Total Supply: <RedSpan>{fellowship.totalSupply}</RedSpan>
                </FellowshipItemSecondaryInfo>
              </FellowshipItemSecondaryInfoSection>
            </FellowshipItemInformation>
          </FellowshipItemLayout>
        </FellowshipItemContainer>
      </Link>
    );
  };

  const renderNoFellowship = () => {
    return (
      <PaddedContainer>
        This deity has not founded a fellowship yet.
      </PaddedContainer>
    );
  };

  return (
    <FellowshipListContainer>
      {fellowships.length > 0
        ? [...fellowships]
            .sort((a, b) => Number(b.totalSupply) - Number(a.totalSupply))
            .map((fellowship, i) => (
              <div key={fellowship.address}>
                {renderFellowshipItem(fellowship, i == fellowships.length - 1)}
              </div>
            ))
        : renderNoFellowship()}
    </FellowshipListContainer>
  );
};
