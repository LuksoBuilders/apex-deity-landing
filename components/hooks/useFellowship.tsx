import { ethers } from "ethers";
import { FetchingData, Fellowship } from "../types";

export const useFellowship = (
  fellowshipsAddresses: string
): FetchingData<Fellowship> => {
  const fellowship: Fellowship = {
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
  };

  return {
    loading: false,
    error: null,
    data: fellowship,
  };
};
