import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";

import { ExtensionContextType } from "../utils/interfaces";
import {
    bytes32ToNumber,
    numberToBytes32
} from "../utils/helpers";
import {
    getAvailableBalance,
    getHolyShitBalance,
    getHolyShitTotalSupply,
    getLastShitMintTime,
    getUserBalance,
} from "../services/blockchainService";

import { getDeitiesContract, getHolyShitContract } from "../contracts/contracts";

import { MAINNET_CHAIN_ID, APEX_DEITIES_CONTRACT_ADDRESS, HOLY_SHIT_CONTRACT_ADDRESS } from "../utils/constants";

const ExtensionContext = createContext<ExtensionContextType>({
    provider: null,
    signer: null,
    accounts: [],
    connect: async () => { },
    connectedAccount: undefined,
    isConnected: false,
    availableBalances: [],
    userBalances: [],
    totalShitsSupply: 0,
    lastShitTime: new Map(),
    shitBalance: ethers.BigNumber.from(0),
    shit: async (tokenId: number) => { },
    batchShit: async (tokenIds: Array<number>) => { },
    mint: async (order: Array<Number>, value: ethers.BigNumber) => { },
});

export const useExtension = () => {
    const context = useContext(ExtensionContext);
    if (!context) {
        throw new Error("useExtension must be used within a ExtensionProvider");
    }
    return context;
};

export const ExtentionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [availableBalances, setAvailableBalances] = useState<Array<number>>([
        25, 25, 25, 25,
    ]);
    const [userBalances, setUserBalances] = useState<Array<number>>([]);
    const [totalShitsSupply, setTotalShitSupply] = useState(0);
    const [lastShitTime, setLastShitTime] = useState<
        Map<number, ethers.BigNumber>
    >(new Map());
    const [shitBalance, setShitBalance] = useState<ethers.BigNumber>(
        ethers.BigNumber.from(0)
    );

    const [refetchCounter, setRefetch] = useState(0);

    const refetch = () => {
        setRefetch(refetchCounter + 1);
    };

    const connectedAccount = accounts[0];

    useEffect(() => {
        if (connectedAccount) {
            console.log("connecting ...");
            connect();
        }
    }, [connectedAccount]);

    useEffect(() => {
        const getData = async () => {
            if (provider) {
                setAvailableBalances(await getAvailableBalance(provider));
                setTotalShitSupply(await getHolyShitTotalSupply(provider))
            }

            if (signer && connectedAccount) {
                setUserBalances(await getUserBalance(signer, connectedAccount));
                setShitBalance(await getHolyShitBalance(signer, connectedAccount));
            }
        };

        getData();

        const intervalId = setInterval(() => {
            getData();
        }, 100000); // 10 seconds in milliseconds

        // Clear the interval when the component unmounts or when the dependencies change
        return () => clearInterval(intervalId);
    }, [signer, connectedAccount, provider, refetchCounter]);

    useEffect(() => {
        const getData = async () => {
            if (signer && userBalances) {
                const lst = await getLastShitMintTime(signer, userBalances);
                // @ts-ignore
                setUserBalances(lst);
            }
        };

        getData();

        const intervalId = setInterval(() => {
            getData();
        }, 100000); // 10 seconds in milliseconds

        // Clear the interval when the component unmounts or when the dependencies change
        return () => clearInterval(intervalId);
    }, [signer, userBalances, refetchCounter]);

    // @ts-ignore
    const getAccounts = async (provider) => {
        setAccounts(await provider.send("eth_accounts", []));
    };

    useEffect(() => {
        const connectProvider = async () => {
            const web3Provider =
                // @ts-ignore
                window.lukso && window.lukso.isUniversalProfileExtension
                    ? // @ts-ignore
                    new ethers.providers.Web3Provider(window.lukso)
                    : new ethers.providers.JsonRpcProvider("https://42.rpc.thirdweb.com");
            // @ts-ignore
            setProvider(web3Provider);
            getAccounts(web3Provider);
        };

        connectProvider();
    }, []);

    const connect = async () => {
        try {
            // @ts-ignore
            //if (window.lukso && window.lukso.isUniversalProfileExtension) {
            console.log(window.lukso);

            if (window.lukso) {
                console.log(window.lukso);

                await window.lukso.request({
                    method: "wallet_switchEthereumChain",
                    params: [
                        {
                            chainId: MAINNET_CHAIN_ID,
                        },
                    ],
                });

                if (!connectedAccount) {
                    // @ts-ignore
                    await provider.send("eth_requestAccounts", []);
                }
                // @ts-ignore
                const walletSigner = provider.getSigner();
                setProvider(provider);
                getAccounts(provider);
                setSigner(walletSigner);
            } else {
                alert("Please install universal profile extension.");
                console.error("No Ethereum provider found");
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    const isConnected = !!connectedAccount;

    const shit = async (tokenId: number) => {
        if (signer) {
            const holyShit = getHolyShitContract(signer);

            try {
                console.log("shitting for tokenId", numberToBytes32(tokenId));
                const tx = await holyShit.shit(numberToBytes32(tokenId));

                await tx.wait();

                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const batchShit = async (tokenIds: Array<number>) => {
        if (signer) {
            const holyShit = getHolyShitContract(signer);
            try {
                const listIds = tokenIds.map((tokenId) => numberToBytes32(tokenId));
                console.log("shitting for tokenId", listIds);
                const tx = await holyShit.batchShit(listIds);

                await tx.wait();

                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const mint = async (order: Array<number>, value: ethers.BigNumber) => {
        if (signer) {
            const deities = getDeitiesContract(signer);

            console.log(
                ethers.utils.formatEther(await deities.getOrderPrice(order)),
                ethers.utils.formatEther(value)
            );

            try {
                const tx = await deities.mint(order, { value });

                await tx.wait();

                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <ExtensionContext.Provider
            value={{
                provider,
                accounts,
                signer,
                connect,
                connectedAccount,
                isConnected,
                availableBalances,
                userBalances,
                mint,
                totalShitsSupply,
                shit,
                batchShit,
                lastShitTime,
                shitBalance,
            }}
        >
            <DataProvider>{children}</DataProvider>
        </ExtensionContext.Provider>
    );
};
