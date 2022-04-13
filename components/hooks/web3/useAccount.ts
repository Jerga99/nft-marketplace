
import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

type UseAccountResponse = {
  connect: () => void
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({provider, ethereum}) => () => {
  const swrRes = useSWR(
    provider ? "web3/useAccount" : null,
    async () => {
      const accounts = await provider!.listAccounts();
      const account = accounts[0];

      if (!account) {
        throw "Cannot retreive account! Please, connect to web3 wallet."
      }

      return account;
    }, {
      revalidateOnFocus: false
    }
  )

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swrRes,
    connect
  };
}
