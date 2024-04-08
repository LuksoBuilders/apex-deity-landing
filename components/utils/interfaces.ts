import { ethers } from "ethers";

interface DataProviderProps {
    children: React.ReactNode;
}

interface DataContextType {
    getUPData: (address: string) => Promise<any>;
    getLSP4Data: (address: string) => Promise<any>;
}

interface ExtensionContextType {
    provider: ethers.providers.Provider | null;
    signer: ethers.Signer | null;
    accounts: string[];
    connect: () => Promise<void>;
    connectedAccount: string | undefined;
    isConnected: boolean;
    availableBalances: Array<number>;
    userBalances: Array<number>;
    totalShitsSupply: number;
    lastShitTime: Map<number, ethers.BigNumber>;
    shitBalance: ethers.BigNumber;
    shit: (tokenId: number) => Promise<void>;
    batchShit: (tokenIds: Array<number>) => Promise<void>;
    mint: (order: Array<number>, value: ethers.BigNumber) => Promise<void>;
}


export type { DataProviderProps, DataContextType, ExtensionContextType };