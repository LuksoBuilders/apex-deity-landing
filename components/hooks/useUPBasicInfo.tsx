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
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
    name: "Jon Doe",
    username: "jondoe#2341",
  };

  return {
    loading: false,
    error: null,
    data: upBasicInfo,
  };
};
