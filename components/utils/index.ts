export const ipfsURLtoNormal = (URI: string) => {
  return URI.replace("ipfs://", "https://ipfs.io/ipfs/");
};
