import styled from "styled-components";
import { ethers } from "ethers";
import { CircledImage } from "../../atoms";
import { Fellowship } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";

const fellowships: Array<Fellowship> = [
  {
    address: "0xF4A97b59dC44e4A0969c08b8858e69e057537a11",
    initialized: true,
    endorsementAddress: "0x9d6F3c3e42Ae4aE52CA13E152edF8eD417b4BbDf",
    contributeAddress: "0x2E83f3e45e17DdE2B29cF9d05A786e5b3cD3Ed7E",
    logo: "https://picsum.photos/200",
    name: "Craftsman Collective",
    symbol: "CCC",
    artisan: {
      address: "0xF4A97b59dC44e4A0969c08b8858e69e057537a11",
      avatar:
        "https://api.universalprofile.cloud/image/QmWVZEpweFpLw9qMNBt5C9bqS7s2AgTzgeGR8PpN8mu7Ki?width=1000?width=1000",
      name: "ArtisanAdept",
      username: "@artisanadept#8c43",
    },
    founder: {
      id: 78,
      tier: "c",
      name: "Erato",
      image: "https://artisanally.io/deities/erato.png",
      level: 2,
      xp: 13,
      availableSlots: 1,
      slots: 3,
      fellowships: 4,
      rank: 81,
      harvestableAmount: 9,
    },
    mintPrice: ethers.utils.parseEther("3.5"),
    totalSupply: ethers.BigNumber.from(1000),
  },
  {
    initialized: true,
    address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
    endorsementAddress: "0xDe939c88A551691F6952d68aa2110ADc45076a40",
    contributeAddress: "0x6780c126048Cabea92A221821cd4dA27E9c56e0A",
    logo: "https://picsum.photos/200",
    name: "Artisan Ally",
    symbol: "ALY",
    artisan: {
      address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
      avatar:
        "https://api.universalprofile.cloud/image/QmSf9qaPfn1rCN6kzkkeWLRcqQP8m26oXyy9yrVa2iyZhN?width=1000?width=1000",
      name: "Ethalorian",
      username: "@ethalorian#26e7",
    },
    founder: {
      id: 0,
      tier: "s",
      name: "Zeus",
      image:
        "https://artisanally.io/_next/image?url=%2Fdeities%2Fzeus.png&w=256&q=75",
      level: 5,
      xp: 153,
      availableSlots: 2,
      slots: 9,
      fellowships: 18,
      rank: 2,
      harvestableAmount: 121,
    },
    mintPrice: ethers.utils.parseEther("3.2"),
    totalSupply: ethers.BigNumber.from(1356),
  },
  {
    initialized: false,
    address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
    endorsementAddress: "0xDe939c88A551691F6952d68aa2110ADc45076a40",
    contributeAddress: "0x6780c126048Cabea92A221821cd4dA27E9c56e0A",
    logo: "https://picsum.photos/200",
    name: "Artisan Ally",
    symbol: "ALY",
    artisan: {
      address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
      avatar:
        "https://api.universalprofile.cloud/image/QmSf9qaPfn1rCN6kzkkeWLRcqQP8m26oXyy9yrVa2iyZhN?width=1000?width=1000",
      name: "Ethalorian",
      username: "@ethalorian#26e7",
    },
    founder: {
      id: 0,
      tier: "s",
      name: "Zeus",
      image:
        "https://artisanally.io/_next/image?url=%2Fdeities%2Fzeus.png&w=256&q=75",
      level: 5,
      xp: 153,
      availableSlots: 2,
      slots: 9,
      fellowships: 18,
      rank: 2,
      harvestableAmount: 121,
    },
    mintPrice: ethers.utils.parseEther("3.2"),
    totalSupply: ethers.BigNumber.from(1356),
  },
];

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
  font-size: 19px;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
`;

interface FellowshipListProps {}

export const FellowshipsList = ({}: FellowshipListProps) => {
  const router = useRouter();

  const renderFellowshipItem = (fellowship: Fellowship, isLast: boolean) => {
    if (!fellowship.initialized) {
      return (
        <FellowshipItemContainer
          //href={`/fellowship/${fellowship.address}`}
          $isLast={isLast}
        >
          <UninitializedFellowshipHeader>
            This Fellowship has not been initialized yet.
          </UninitializedFellowshipHeader>
          <FellowshipItemSecondaryInfo>
            Artisan: <Red>{fellowship.artisan.name}</Red>
          </FellowshipItemSecondaryInfo>
          <FellowshipItemSecondaryInfo>
            Founder: <Red>{fellowship.founder.name}</Red>
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
            <CircledImage width="30%" squared src={fellowship.logo} />
            <FellowshipItemInformation>
              <FellowshipItemMainInfo>
                {fellowship.name} - {fellowship.symbol}
              </FellowshipItemMainInfo>
              <FellowshipItemSecondaryInfoSection>
                <FellowshipItemSecondaryInfo>
                  Artisan: <Red>{fellowship.artisan.name}</Red>{" "}
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Mint Price:
                  <Red>
                    {" "}
                    {ethers.utils.formatEther(fellowship.mintPrice)} $LYX
                  </Red>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Founder: <Red>{fellowship.founder.name}</Red>
                </FellowshipItemSecondaryInfo>
                <FellowshipItemSecondaryInfo>
                  Total Supply: <Red>1000</Red>
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
      {fellowships.map((fellowship, i) => (
        <div key={fellowship.address}>
          {renderFellowshipItem(fellowship, i == fellowships.length - 1)}
        </div>
      ))}
    </FellowshipListContainer>
  );
};
