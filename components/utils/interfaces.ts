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

interface NumberRanges {
    S: number;
    A: number;
    B: number;
    C: number;
}

interface LearningCurveNavigatorProps {
    items: Array<string>;
    selectedItem: number;
    setSelectedItem: (item: number) => void;
}


interface LearningCurveDataProps {
    title: string;
    children?: React.ReactNode;
}

interface LearningCurveControlsProps {
    nextName: string | undefined;
    backName: string | undefined;
    onNext: Function | undefined;
    onBack: Function | undefined;
}

interface ShittableTextProps {
    expiryTimestamp: Date;
    refetch: () => void;
}

interface DeityCardProps {
    tier: string;
    name: string;
    owner: string;
    image: string;
    shitAmount: number;
    lastShitTime: ethers.BigNumber | undefined;
    onShit: () => Promise<void>;
}

interface MintSelectorProps {
    value: number;
    setValue: (n: number) => void;
    available: number;
    tier: string;
}

interface CountDownProps {
    identifier: string;
    amount: number;
}

export type {
    DataProviderProps,
    DataContextType,
    ExtensionContextType,
    NumberRanges,
    LearningCurveNavigatorProps,
    LearningCurveDataProps,
    LearningCurveControlsProps,
    ShittableTextProps,
    DeityCardProps,
    MintSelectorProps,
    CountDownProps
};