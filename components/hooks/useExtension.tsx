import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";
import { LSPFactory } from "../lsp-tools";
import { generateVerifiableURIFromIPFS } from "../utils";

import ApexDeities from "../abis/ApexDeities.json";
import HolyShit from "../abis/HolyShit.json";
import ArtisanAlly from "../abis/ArtisanAlly.json";
import Fellowship from "../abis//Fellowship.json";

const testnetRPC = "https://4201.rpc.thirdweb.com";
const mainnetRPC = "https://rpc.lukso.sigmacore.io";

const targetRPC = mainnetRPC;

const targetChainId = 42;

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
  foundFellowship: (
    deity: number,
    slot: number,
    artisan: string
  ) => Promise<void>;
  initializeFellowship: (
    fellowshiAddress: string,
    fellowshipName: string,
    fellowshipSymbol: string,
    fellowshipLogo: File,
    fellowshipDescription: string
  ) => Promise<void>;
  mintBackerBuck: (
    fellowshiAddress: string,
    amount: number,
    gqlSupply: number
  ) => Promise<void>;
}

export function bytes32ToNumber(bytes: string): bigint {
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
//const HOLY_SHIT_CONTRACT_ADDRESS = "0x2fF8dF5F47Cd67AfE425a2acb28d6506838495Ee";

const mainnetContractAddresses = {
  apexDeities: "0xb4E32a20aa27B5891Bfa592c392c9858A1DD3945",
  holyShit: "0x2fF8dF5F47Cd67AfE425a2acb28d6506838495Ee",
  artisanAlly: "0x84d6022AeCb5d558Cb119A8632b79436f0575ee3",
};

const testnetContractAddresses = {
  apexDeities: "0xb4E32a20aa27B5891Bfa592c392c9858A1DD3945",
  holyShit: "0xAd28D1A66597f0EC79829A02Db9CCCf361f2b8Ac",
  artisanAlly: "0x83A86e0531DA80Bb4D33DC11276AF793BD52323C",
  //holyShit: "",
  //holyShit: "",
  //holyShit: "",
  //holyShit: "",
  //holyShit: "",
};

const targetContractAddresses = mainnetContractAddresses;

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
  foundFellowship: async (deity: number, slot: number, artisan: string) => {},
  initializeFellowship: async (
    fellowshiAddress: string,
    fellowshipName: string,
    fellowshipSymbol: string,
    fellowshipLogo: File,
    fellowshipDescription: string
  ) => {},
  mintBackerBuck: async (
    fellowshiAddress: string,
    amount: number,
    gqlSupply: number
  ) => {},
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
          : new ethers.providers.JsonRpcProvider(targetRPC);
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

      if (window.lukso) {
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
      targetContractAddresses.apexDeities,
      ApexDeities,
      provider
    );

    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  const getUserBalance = async (
    signer: ethers.Signer,
    connectedAccount: string
  ) => {
    const deities = new ethers.Contract(
      targetContractAddresses.apexDeities,
      ApexDeities,
      signer
    );
    try {
      const userTokenIds = await deities.tokenIdsOf(connectedAccount);
      setUserBalances(
        userTokenIds.map((tokenId: string) => bytes32ToNumber(tokenId))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getHolyShitTotalSupply = async (
    provider: ethers.providers.Provider
  ) => {
    const holyShit = new ethers.Contract(
      targetContractAddresses.holyShit,
      HolyShit,
      provider
    );

    try {
      setTotalShitSupply(await holyShit.totalSupply());
    } catch (err) {
      console.error(err);
    }
  };

  const getHolyShitBalance = async (
    signer: ethers.providers.Provider,
    connectedAccount: string
  ) => {
    const holyShit = new ethers.Contract(
      targetContractAddresses.holyShit,
      HolyShit,
      signer
    );

    try {
      setShitBalance(await holyShit.balanceOf(connectedAccount));
    } catch (err) {
      console.error(err);
    }
  };

  const shit = async (tokenId: number) => {
    if (signer) {
      const holyShit = new ethers.Contract(
        targetContractAddresses.holyShit,
        HolyShit,
        signer
      );

      try {
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
        targetContractAddresses.holyShit,
        HolyShit,
        signer
      );

      try {
        const listIds = tokenIds.map((tokenId) => numberToBytes32(tokenId));
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
        targetContractAddresses.apexDeities,
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
        targetContractAddresses.holyShit,
        HolyShit,
        signer
      );

      try {
        const lst = new Map<number, ethers.BigNumber>();

        userBalances.forEach(async (tokenId) => {
          lst.set(
            tokenId,
            await holyShit.lastShitTime(numberToBytes32(tokenId))
          );
        });

        for (const tokenId of userBalances) {
          const lastShitT = await holyShit.lastShitTime(
            numberToBytes32(tokenId)
          );
          lst.set(tokenId, lastShitT);
        }

        setLastShitTime(lst);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const foundFellowship = async (
    deity: number,
    slot: number,
    artisan: string
  ) => {
    if (signer) {
      const artisanAlly = new ethers.Contract(
        targetContractAddresses.artisanAlly,
        ArtisanAlly,
        signer
      );

      try {
        const tx = await artisanAlly.foundFellowship(deity, slot, artisan);

        await tx.wait();

        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const initializeFellowship = async (
    fellowshiAddress: string,
    fellowshipName: string,
    fellowshipSymbol: string,
    fellowshipLogo: File,
    fellowshipDescription: string
  ) => {
    if (signer) {
      const provider = targetRPC;

      const lspFactory = new LSPFactory(provider, {
        chainId: targetChainId,
      });

      const fellowship = new ethers.Contract(
        fellowshiAddress,
        Fellowship,
        signer
      );

      try {
        const metadata =
          await lspFactory.LSP4DigitalAssetMetadata.uploadMetadata({
            description: fellowshipDescription,
            assets: [fellowshipLogo],
            images: [fellowshipLogo],
            links: [],
          });

        const verifiableURI = await generateVerifiableURIFromIPFS(metadata.url);

        const tx = await fellowship.initialize(
          fellowshipName,
          fellowshipSymbol,
          verifiableURI
        );

        await tx.wait();

        refetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const mintBackerBuck = async (
    fellowshiAddress: string,
    amount: number,
    gqlSupply: number
  ) => {
    if (signer) {
      const fellowship = new ethers.Contract(
        fellowshiAddress,
        Fellowship,
        signer
      );

      try {
        const totalSupply: ethers.BigNumber = await fellowship.totalSupply();

        const targetSupply: ethers.BigNumber = totalSupply.gte(gqlSupply)
          ? totalSupply
          : ethers.BigNumber.from(gqlSupply);

        const mintPrice = await fellowship.getMintPrice(targetSupply, amount);

        console.log(
          String(gqlSupply),
          String(totalSupply),
          String(targetSupply),
          String(mintPrice[0]),
          String(mintPrice[1])
        );

        console.log(
          "error is: ",
          fellowship.interface.parseError("0x969043da")
        );

        const tx = await fellowship.mint(amount, { value: mintPrice[1] });

        await tx.wait();
        refetch();
      } catch (err) {
        console.error("is error here?", err);
      }
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
        foundFellowship,
        initializeFellowship,
        mintBackerBuck,
      }}
    >
      <DataProvider>{children}</DataProvider>
    </ExtentionContext.Provider>
  );
};
