
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)
export const hookFactory = (deps: any) => (params: any) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.log(deps);
    console.log(params);
    // making request to get data
    return "Test User"
  })

  return swrRes;
}

export const useAccount = hookFactory({ethereum: null, provider: null});
