export interface FetchingData<DataType> {
  data: DataType;
  loading: boolean;
  error: Error | null;
}

export interface Deity {
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
