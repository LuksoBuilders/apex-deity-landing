import axios from "axios";
import web3 from "web3";

export const ipfsURLtoNormal = (URI: string) => {
  return URI.replace("ipfs://", "https://ipfs.io/ipfs/");
};

export async function generateVerifiableURIFromIPFS(ipfsURI: string) {
  try {
    // Replace ipfs:// with https://ipfs.io/ipfs/ to fetch the content
    const ipfsGatewayURI = ipfsURI.replace(
      "ipfs://",
      "https://gateway.lighthouse.storage/ipfs/"
    );

    // Fetch JSON content from IPFS
    const response = await axios.get(ipfsGatewayURI);
    const json = JSON.stringify(response.data);

    // Custom identifier for the verifiable URI
    const verifiableUriIdentifier = "0x0000";

    // Get the bytes4 representation of the verification method
    const verificationMethod = web3.utils
      .keccak256("keccak256(bytes)")
      .substr(0, 10); // Truncate to 8 characters

    // Get the hash of the JSON file (verification data)
    const verificationData = web3.utils.keccak256(json);

    // Get the verification data length and pad it as 2 bytes
    const verificationDataLength = web3.utils.padLeft(
      web3.utils.numberToHex(verificationData.substring(2).length / 2),
      4
    );

    // Encode the URL
    const encodedUrl = web3.utils.utf8ToHex(ipfsURI);

    // Final verifiable URI
    const verifiableURI =
      verifiableUriIdentifier +
      verificationMethod.substring(2) +
      verificationDataLength.substring(2) +
      verificationData.substring(2) +
      encodedUrl.substring(2);

    return verifiableURI;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate error
  }
}
