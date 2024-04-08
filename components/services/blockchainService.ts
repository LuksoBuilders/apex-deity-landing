import { ethers } from "ethers";
import { getDeitiesContract, getHolyShitContract } from "../contracts/contracts";
import { bytes32ToNumber, numberToBytes32, getAvailableFromMinted } from "../utils/helpers";

export const getLastShitMintTime = async (signer: ethers.Signer, userBalances: number[]): Promise<Map<number, ethers.BigNumber>> => {
    const holyShit = getHolyShitContract(signer);
    const lst = new Map<number, ethers.BigNumber>();

    for (const tokenId of userBalances) {
        const lastShitTime = await holyShit.lastShitTime(numberToBytes32(tokenId));
        lst.set(tokenId, lastShitTime);
    }
    return lst;
};

export const getAvailableBalance = async (provider: ethers.providers.Provider): Promise<number[]> => {
    const deities = getDeitiesContract(provider);
    const tiers = ['sTierMinted', 'aTierMinted', 'bTierMinted', 'cTierMinted'];
    const results = await Promise.all(tiers.map(tier => deities[tier]()));
    return results.map(getAvailableFromMinted);
};

export const getHolyShitTotalSupply = async (provider: ethers.providers.Provider): Promise<number> => {
    const holyShit = getHolyShitContract(provider);
    return holyShit.totalSupply();
};

export const getUserBalance = async (signer: ethers.Signer, connectedAccount: string): Promise<number[]> => {
    const deities = getDeitiesContract(signer);
    const userTokenIds = await deities.tokenIdsOf(connectedAccount);
    return userTokenIds.map(bytes32ToNumber);
};

export const getHolyShitBalance = async (signer: ethers.Signer, connectedAccount: string): Promise<ethers.BigNumber> => {
    const holyShit = getHolyShitContract(signer);
    return holyShit.balanceOf(connectedAccount);
};
