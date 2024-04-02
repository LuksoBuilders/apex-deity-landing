import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";
import ApexDeities from "../abis/ApexDeities.json";

interface ExtentionContextType {
  provider: ethers.providers.Provider | null;
  signer: ethers.Signer | null;
  accounts: string[];
  connect: () => Promise<void>;
  connectedAccount: string | undefined;
  isConnected: boolean;
  availableBalances: Array<number>;
  userBalances: Array<number>;
}

const MAINNET_CHAIN_ID = "0x2a";
const TESTNET_CHAIN_ID = "0x1069";

const APEX_DEITIES_CONTRACT_ADDRESS =
  "0xb4E32a20aa27B5891Bfa592c392c9858A1DD3945";

const ExtentionContext = createContext<ExtentionContextType>({
  provider: null,
  signer: null,
  accounts: [],
  connect: async () => {},
  connectedAccount: undefined,
  isConnected: false,
  availableBalances: [],
  userBalances: [],
});

export const useExtention = () => {
  return useContext(ExtentionContext);
};

// @ts-ignore
export const ExtentionProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [availableBalances, setAvailableBalances] = useState<Array<number>>([]);
  const [userBalances, setUserBalances] = useState<Array<number>>([]);

  console.log(accounts);

  const connectedAccount = accounts[0];

  useEffect(() => {
    if (connectedAccount) {
      console.log("connecting ...");
      connect();

      if (signer) {
        getUserBalance(signer, connectedAccount);
      }
    }
  }, [connectedAccount]);

  useEffect(() => {
    const getData = () => {
      if (provider) {
        getAvaiableBalance(provider);
      }

      if (signer) {
        getUserBalance(signer, connectedAccount);
      }
    };

    getData();

    const intervalId = setInterval(() => {
      getData();
    }, 10000); // 10 seconds in milliseconds

    // Clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, [signer, connectedAccount, provider]);

  // @ts-ignore
  const getAccounts = async (provider) => {
    setAccounts(await provider.send("eth_accounts", []));
  };

  useEffect(() => {
    const connectProvider = async () => {
      const web3Provider =
        // @ts-ignore
        window.ethereum && window.ethereum.isUniversalProfileExtension
          ? // @ts-ignore
            new ethers.providers.Web3Provider(window.ethereum)
          : new ethers.providers.JsonRpcProvider(
              "https://rpc.testnet.lukso.network"
            );
      // @ts-ignore
      setProvider(web3Provider);
      getAccounts(web3Provider);
    };

    connectProvider();
  }, []);

  const connect = async () => {
    try {
      // @ts-ignore
      if (window.ethereum && window.ethereum.isUniversalProfileExtension) {
        console.log(window.ethereum);

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: TESTNET_CHAIN_ID,
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
    setUserBalances(userTokenIds);
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
      }}
    >
      <DataProvider>{children}</DataProvider>
    </ExtentionContext.Provider>
  );
};
