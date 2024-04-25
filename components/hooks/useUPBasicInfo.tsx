import { FetchingData } from "../types";

interface UPBasicInfo {
  avatar: string;
  name: string;
  username: string;
}

export const useUPBasicInfo = (
  upAddress: string
): FetchingData<UPBasicInfo> => {
  const upBasicInfo: UPBasicInfo = {
    avatar:
      "https://api.universalprofile.cloud/image/bafybeiem5kdrxt3msaej26p5jjqckcvumgctedckgw7l2iexnjhxsebbqi?width=1000",
    name: "Beef",
    username: "@beef#2652",
  };

  return {
    loading: false,
    error: null,
    data: upBasicInfo,
  };
};
