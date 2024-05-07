import styled from "styled-components";
import { SidebarList } from "../../../molecules";
import { ethers } from "ethers";
import { Deity } from "../../../types";
import { UserFellowshipsSidebarListItem } from "./UserFellowshipsSidebarItem";
import { SidebarListItem } from "../../../molecules/general/SidebarListItem";
import { Fellowship } from "../../../types";

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
      image: "https://artisanally.io/fellowships/erato.png",
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
        "https://artisanally.io/_next/image?url=%2Ffellowships%2Fzeus.png&w=256&q=75",
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
        "https://artisanally.io/_next/image?url=%2Ffellowships%2Fzeus.png&w=256&q=75",
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

interface UserFellowshipsSidebarMenuInterface {
  //fellowships: Array<Deity>;
}

export const UserFellowshipsSidebarMenu =
  ({}: UserFellowshipsSidebarMenuInterface) => {
    return (
      <SidebarList
        title="Your Fellowships"
        more={fellowships.length - 2}
        allRoute="/my-fellowships"
      >
        <div>
          {fellowships.map((fellowship, i) => (
            <SidebarListItem finish={i == fellowships.length - 1} key={i}>
              <UserFellowshipsSidebarListItem fellowship={fellowship} />
            </SidebarListItem>
          ))}
        </div>
      </SidebarList>
    );
  };
