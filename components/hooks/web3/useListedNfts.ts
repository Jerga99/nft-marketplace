
import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import useSWR from "swr";

type UseListedNftsResponse = {}
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const coreNfts = await contract!.getAllNftsOnSale() as Nft[];
      
      const nfts = [] as any;
      return nfts;
    }
  )
  return {
    ...swr,
    data: data || [],
  };
}
