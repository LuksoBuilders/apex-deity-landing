import { ethers } from "ethers";

export interface FetchingData<DataType> {
  data: DataType;
  loading: boolean;
  error: Error | null;
}

export interface Deity {
  id: number;
  tier: string;
  name: string;
  image: string;
  level: number;
  xp: number;
  availableSlots: number;
  slots: number;
  fellowships: number;
  rank: number;
  harvestableAmount: number;
}

export interface UPBasicInfo {
  avatar: string;
  name: string;
  username: string;
  address: string;
}

export interface Fellowship {
  address: string;
  initialized?: boolean;
  endorsementAddress: string;
  contributeAddress: string;
  logo: string;
  name: string;
  symbol: string;
  artisan: UPBasicInfo;
  founder: Deity;
  mintPrice: ethers.BigNumber;
  totalSupply: ethers.BigNumber;
}

export interface User extends UPBasicInfo {
  //id: string;
  //address: string;
  //fellowships: Array<Fellowship>;
  //deities: Array<Deity>;
  //backerBuck: Array<BackerBuck>;
}

export interface BalanceItem {
  id: string;
  fellowship: Fellowship;
  balance: number;
  endorsements: number;
  contributions: number;
}
