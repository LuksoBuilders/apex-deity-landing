import styled from "styled-components";
import { ethers } from "ethers";
import { CircledImage } from "../../atoms";
import { Fellowship } from "../../types/remoteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { CenteredDiv } from "../../atoms";
import { BounceLoader } from "react-spinners";
import { ipfsURLtoNormal } from "../../utils";

const GET_FELLOWSHIPS = gql`
  query Fellowships {
    fellowships {
      id
      name
      symbol
      address
      metadata
      info {
        assets {
          url
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          url
        }
        links {
          title
          url
        }
      }
      artisan {
        id
        profile {
          name
          profileImage {
            url
          }
        }
      }
      founder {
        id
        metadata {
          name
          images {
            url
          }
        }
      }
      backerBucks {
        id
      }
      contributionAddress
      contributions {
        id
      }
      endorsementAddress
      endorsements {
        id
      }
      currentPrice
      initialPrice
      priceGrowth
      totalSupply
    }
  }
`;

const FellowshipListContainer = styled.div``;

interface Lastable {
  $isLast: boolean;
}

const FellowshipItemContainer = styled.div<Lastable>`
  display: block;
  border-bottom: ${({ $isLast }) => ($isLast ? "0px" : "1px")} solid #c8c8c8;
  margin-bottom: ${({ $isLast }) => ($isLast ? "em" : "1em")};
  padding-bottom: ${({ $isLast }) => ($isLast ? "em" : "1em")};
  cursor: pointer;
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

const FellowshipItemInfoRow = styled.div``;

const FellowshipItemSecondaryInfo = styled.h5`
  font-weight: 400;
  font-size: 19px;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

interface FellowshipListProps {}

export const FellowshipsList = ({}: FellowshipListProps) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_FELLOWSHIPS);

  console.log(data, loading, error);

  if (!data) {
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );
  }

  const fellowships: Array<Fellowship> = data.fellowships;
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
            Artisan: <Red>{fellowship.artisan.profile.name}</Red>
          </FellowshipItemSecondaryInfo>
          <FellowshipItemSecondaryInfo>
            Founder: <Red>{fellowship.founder.metadata.name}</Red>
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
                  : ""
              }
            />
            <FellowshipItemInformation>
              <FellowshipItemMainInfo>
                {fellowship.name} - {fellowship.symbol}
              </FellowshipItemMainInfo>
              <FellowshipItemSecondaryInfoSection>
                <FellowshipItemSecondaryInfo>
                  Artisan: <Red>{fellowship.artisan.profile.name}</Red>{" "}
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Mint Price:
                  <Red>
                    {" "}
                    {Number(
                      ethers.utils.formatEther(fellowship.currentPrice)
                    ).toFixed(3)}{" "}
                    $LYX
                  </Red>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Founder: <Red>{fellowship.founder.metadata.name}</Red>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Total Supply: <Red>{fellowship.totalSupply}</Red>
                </FellowshipItemSecondaryInfo>
              </FellowshipItemSecondaryInfoSection>
            </FellowshipItemInformation>
          </FellowshipItemLayout>
        </FellowshipItemContainer>
      </Link>
    );
  };

  return (
    <FellowshipListContainer>
      {[...fellowships]
        .sort((a, b) => Number(b.totalSupply) - Number(a.totalSupply))
        .map((fellowship, i) => (
          <div key={fellowship.address}>
            {renderFellowshipItem(fellowship, i == fellowships.length - 1)}
          </div>
        ))}
    </FellowshipListContainer>
  );
};
