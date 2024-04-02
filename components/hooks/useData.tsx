import React, { createContext, useContext, useCallback } from "react";
import { ethers } from "ethers";
import LSP3 from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import LSP4 from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";
import { ERC725 } from "@erc725/erc725.js";
import Web3 from "web3";

interface DataProviderProps {
  children: React.ReactNode;
}

interface DataContextType {
  getUPData: (address: string) => Promise<any>;
  getLSP4Data: (address: string) => Promise<any>;
}

const DataContext = createContext<DataContextType>({
  getUPData: async () => {},
  getLSP4Data: async () => {},
});

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
}: DataProviderProps) => {
  const erc725Config = {
    ipfsGateway: "https://cloudflare-ipfs.com/ipfs",
  };

  const RPC_URL = "https://rpc.testnet.lukso.network";

  const erc725Provider = new Web3.providers.HttpProvider(RPC_URL);

  const getUPData = useCallback(async (address: string) => {
    const erc725 = new ERC725(LSP3, address, RPC_URL, erc725Config);
    try {
      const fetchedData = (await erc725.fetchData("LSP3Profile"))?.value;
      return fetchedData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const getLSP4Data = useCallback(async (address: string) => {
    try {
      const erc725 = new ERC725(LSP4, address, erc725Provider, erc725Config);
      const fetchedData = await erc725.fetchData("LSP4TokenSymbol");
      return fetchedData;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        getUPData,
        getLSP4Data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
