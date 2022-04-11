
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: Contract | null;
}

export type Web3State = {
  isLoading: boolean; // true while loading web3State
} & Web3Params

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
  }
}
