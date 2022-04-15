import { createContext, FunctionComponent, useContext, useEffect, useState } from "react"
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

function pageReload() {
  window.location.reload();
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const contract =  await loadContract("NftMarket", provider);

        setGlobalListeners(window.ethereum);
        setWeb3Api(createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract,
          isLoading: false
        }))
      } catch(e: any) {
        console.error("Please, install web3 wallet");
        setWeb3Api((api) => createWeb3State({
          ...api as any,
          isLoading: false,
        }))
      }
    }

    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, [])

  const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload);
  }

  const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.removeListener("chainChanged", pageReload);
  }

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;









