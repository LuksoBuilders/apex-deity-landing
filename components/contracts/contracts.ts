import { ethers } from "ethers";
import ApexDeities from "../abis/ApexDeities.json";
import HolyShit from "../abis/HolyShit.json";
import { APEX_DEITIES_CONTRACT_ADDRESS, HOLY_SHIT_CONTRACT_ADDRESS } from "../utils/constants";

export const getDeitiesContract = (provider: ethers.providers.Provider | ethers.Signer) => {
    return new ethers.Contract(APEX_DEITIES_CONTRACT_ADDRESS, ApexDeities, provider);
}

export const getHolyShitContract = (provider: ethers.providers.Provider | ethers.Signer) => {
    return new ethers.Contract(HOLY_SHIT_CONTRACT_ADDRESS, HolyShit, provider);
}
