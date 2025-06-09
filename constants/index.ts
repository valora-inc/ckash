import { Pretium } from '../api/api'


if (!process.env.API_KEY || !process.env.BASE_URL) {
  throw new Error(
    'API_KEY and BASE_URL must be defined in environment variables',
  )
}

const Pretium_api = new Pretium(process.env.API_KEY , process.env.BASE_URL )

export { Pretium_api }

export const CHAIN_ID = 42220
export const PRETIUM_ADDRESS = '0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98'
export const CHAIN = 'celo'

// Network configurations
export const NETWORK_CONFIG = {
  chainId: CHAIN_ID,
  name: CHAIN,
  pretiumAddress: PRETIUM_ADDRESS,
} as const
