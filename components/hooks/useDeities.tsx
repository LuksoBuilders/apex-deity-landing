import { FetchingData } from "../types";

import { Deity } from "../types";

interface DeityInfo {}

export const useDeities = (
  deitiesId: Array<number>
): FetchingData<Record<string, Deity>> => {
  const deities: Record<string, Deity> = {
    "0": {
      tier: "S",
      name: "Zeus",
      image:
        "https://artisanally.io/_next/image?url=%2Fdeities%2Fzeus.png&w=256&q=75",
      level: 5,
      xp: 153,
      availableSlots: 3,
      slots: 9,
      fellowships: 18,
      rank: 2,
      harvestableAmount: 121,
    },
    "78": {
      tier: "C",
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
  };

  return {
    loading: false,
    error: null,
    data: deities,
  };
};
