import { FetchingData } from "../types";
import { Deity } from "../types";

interface UninitializedFellowship {
  deity: Deity;
}

export const useUninitializedFellowhsip = (
  fellowshipAddress: string
): FetchingData<UninitializedFellowship> => {
  const uninitializedFellowship: UninitializedFellowship = {
    deity: {
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
  };

  return {
    loading: false,
    error: null,
    data: uninitializedFellowship,
  };
};
