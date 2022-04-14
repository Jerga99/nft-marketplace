
import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

type UseNetworkResponse = {
  isLoading: boolean;
}

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>

export const hookFactory: NetworkHookFactory = ({provider, isLoading}) => () => {
  const {data, isValidating, ...swr} = useSWR(
    provider ? "web3/useNetwork" : null,
    async () => {

      return "Testing Network";
    }, {
      revalidateOnFocus: false
    }
  )

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading || isValidating,
  };
}
