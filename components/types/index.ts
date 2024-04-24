export interface FetchingData<DataType> {
  data: DataType;
  loading: boolean;
  error: Error | null;
}
