export interface Asset {
  verificationFunction: string;
  verificationData: string;
  url: string;
  fileType: string;
}

export interface Image {
  width: number;
  height: number;
  verificationFunction: string;
  verificationData: string;
  url: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Attribute {
  key: string;
  value: string;
  type: string;
}

export interface LSP4Metadata {
  name: string;
  description: string;
  story: string;
  mythology: string;
  assets: Asset[];
  images: Image[][];
  links: Link[];
  attributes: Attribute[];
}

export interface Verification {
  method: string;
  data: string;
}

export interface Avatar {
  verification: Verification;
  url: string;
  fileType: string;
}

export interface ProfileImage {
  width: string;
  height: string;
  url: string;
  verification: Verification;
  address: string;
  tokenId: string;
}

export interface BackgroundImage {
  width: string;
  height: string;
  url: String;
  verification: Verification;
}

export interface LSP3Profile {
  name: String;
  description: String;
  links: [Link];
  tags: [String];
  avatar: [Avatar];
  profileImage: [ProfileImage];
  backgroundImage: [BackgroundImage];
}

export interface User {
  id: string;
  profile: LSP3Profile;
  fellowships: Fellowship[];
  deities: Deity[];
  backerBucks: BackerBuck[];
  contributions: Contribution[];
  endorsements: Endorsement[];
  endorseds: Endorsement[];
  holyShitsBalance: string;
}

export interface Fellowship {
  id: string;
  name: string;
  symbol: string;
  address: string;
  metadata: string;
  info: LSP4Metadata | null;
  contributionAddress: string;
  endorsementAddress: string;
  priceGrowth: string;
  initialPrice: string;
  currentPrice: string;
  totalSupply: string;
  backerBucks: BackerBuck[];
  contributions: Contribution[];
  endorsements: Endorsement[];
  founder: Deity;
  artisan: User;
}

export interface Deity {
  id: string;
  tokenIdNumber: string;
  metadata: LSP4Metadata | null;
  xp: string;
  level: string;
  owner: User;
  withdrawable: string;
  tier: string;
  slots: Slot[];
  portfolio: Fellowship[];
}

export interface BackerBuck {
  id: string;
  owner: User;
  fellowship: Fellowship;
  amount: string;
}

export interface Contribution {
  id: string;
  contributor: User;
  fellowship: Fellowship;
  amount: string;
  purifiable: string;
}

export interface Endorsement {
  id: string;
  fellowship: Fellowship;
  endorser: User;
  from: User;
  amount: string;
}

export interface Slot {
  id: string;
  deity: Deity;
  index: string;
  usedAt: string;
}
