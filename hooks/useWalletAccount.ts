import {
  useWalletClient
  
} from '@divvi/mobile'


export const useAccount = () => {
  const {
    data: userAccount,
    error,
    status,
    refresh,
  } = useWalletClient({ networkId: 'celo-mainnet' })

  return {
    userAccount,
    error,
    status,
    refresh,
  }
}
