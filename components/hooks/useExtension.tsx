import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";

import ApexDeities from "../abis/ApexDeities.json";
import HolyShit from "../abis/HolyShit.json";

interface ExtentionContextType {
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

function bytes32ToNumber(bytes: string): bigint {
  // Ensure the input string represents a valid bytes32 (64 characters)
  if (bytes.length !== 66) {
    throw new Error("Invalid bytes32 format");
  }

  // Parse the input string as a BigInt in base 16
  const numberValue = BigInt(bytes);

  return numberValue;
}

function numberToBytes32(numberValue: number) {
  // Ensure the input is a valid BigInt

  // Convert the BigInt to a hexadecimal string
  let hexString = BigInt(numberValue).toString(16);

  // Pad the string with zeros to ensure it's 64 characters long
  while (hexString.length < 64) {
    hexString = "0" + hexString;
  }

  // Return the resulting string
  return "0x" + hexString;
}

const MAINNET_CHAIN_ID = "0x2a";
const TESTNET_CHAIN_ID = "0x1069";

const APEX_DEITIES_CONTRACT_ADDRESS =
  "0xb4E32a20aa27B5891Bfa592c392c9858A1DD3945";
const HOLY_SHIT_CONTRACT_ADDRESS = "0x2fF8dF5F47Cd67AfE425a2acb28d6506838495Ee";

const ExtentionContext = createContext<ExtentionContextType>({
  provider: null,
  signer: null,
  accounts: [],
  connect: async () => {},
  connectedAccount: undefined,
  isConnected: false,
  availableBalances: [],
  userBalances: [],
  totalShitsSupply: 0,
  lastShitTime: new Map(),
  shitBalance: ethers.BigNumber.from(0),
  shit: async (tokenId: number) => {},
  batchShit: async (tokenIds: Array<number>) => {},
  mint: async (order: Array<Number>, value: ethers.BigNumber) => {},
});

export const useExtention = () => {
  return useContext(ExtentionContext);
};

// @ts-ignore
export const ExtentionProvider = ({ children }) => {
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
    const getData = () => {
      if (provider) {
        getAvaiableBalance(provider);
        getHolyShitTotalSupply(provider);
      }

      if (signer && connectedAccount) {
        getUserBalance(signer, connectedAccount);
        getHolyShitBalance(signer, connectedAccount);
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
    const getData = () => {
      if (signer && userBalances) {
        getLastShitMintTime();
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

  const getAvaiableBalance = async (provider: ethers.providers.Provider) => {
    const deities = new ethers.Contract(
      APEX_DEITIES_CONTRACT_ADDRESS,
      ApexDeities,
      provider
    );

    const stierMinted = await deities.sTierMinted();
    const atierMinted = await deities.aTierMinted();
    const btierMinted = await deities.bTierMinted();
    const ctierMinted = await deities.cTierMinted();

    const getAvailableFromMinted = (n: ethers.BigNumber) => 25 - Number(n);

    setAvailableBalances([
      getAvailableFromMinted(stierMinted),
      getAvailableFromMinted(atierMinted),
      getAvailableFromMinted(btierMinted),
      getAvailableFromMinted(ctierMinted),
    ]);
  };

  const getUserBalance = async (
    signer: ethers.Signer,
    connectedAccount: string
  ) => {
    const deities = new ethers.Contract(
      APEX_DEITIES_CONTRACT_ADDRESS,
      ApexDeities,
      signer
    );

    const userTokenIds = await deities.tokenIdsOf(connectedAccount);
    setUserBalances(
      userTokenIds.map((tokenId: string) => bytes32ToNumber(tokenId))
    );
  };

  const getHolyShitTotalSupply = async (
    provider: ethers.providers.Provider
  ) => {
    const holyShit = new ethers.Contract(
      HOLY_SHIT_CONTRACT_ADDRESS,
      HolyShit,
      provider
    );

    setTotalShitSupply(await holyShit.totalSupply());
  };

  const getHolyShitBalance = async (
    signer: ethers.providers.Provider,
    connectedAccount: string
  ) => {
    const holyShit = new ethers.Contract(
      HOLY_SHIT_CONTRACT_ADDRESS,
      HolyShit,
      signer
    );

    setShitBalance(await holyShit.balanceOf(connectedAccount));
  };

  const shit = async (tokenId: number) => {
    if (signer) {
      const holyShit = new ethers.Contract(
        HOLY_SHIT_CONTRACT_ADDRESS,
        HolyShit,
        signer
      );

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
      const holyShit = new ethers.Contract(
        HOLY_SHIT_CONTRACT_ADDRESS,
        HolyShit,
        signer
      );

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
      const deities = new ethers.Contract(
        APEX_DEITIES_CONTRACT_ADDRESS,
        ApexDeities,
        signer
      );

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

  const getLastShitMintTime = async () => {
    if (signer) {
      const holyShit = new ethers.Contract(
        HOLY_SHIT_CONTRACT_ADDRESS,
        HolyShit,
        signer
      );

      const lst = new Map<number, ethers.BigNumber>();

      console.log(userBalances);
      userBalances.forEach(async (tokenId) => {
        lst.set(tokenId, await holyShit.lastShitTime(numberToBytes32(tokenId)));
      });

      for (const tokenId of userBalances) {
        const lastShitT = await holyShit.lastShitTime(numberToBytes32(tokenId));
        lst.set(tokenId, lastShitT);
      }

      setLastShitTime(lst);
    }
  };

  return (
    <ExtentionContext.Provider
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
    </ExtentionContext.Provider>
  );
};
