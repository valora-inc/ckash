import { Pretium } from '../api/api'
import MpesaIcon from '../assets/icons/sendmoney-icon.svg'
import AirtimeIcon from '../assets/icons/airtime-icon.svg'
import DataIcon from '../assets/icons/network-icon.svg'
import PaybillIcon from '../assets/icons/paybills-icon.svg'
import AirtelTigoIcon from '../assets/icons/airteltigo-icon.svg'
import SendMoneyIcon from '../assets/icons/opay-icon.svg'
import MTNIcon from '../assets/icons/mtn-icon.svg'
import TelecelIcon from '../assets/icons/telecel-icon.svg'
import BuyGoodsIcon from '../assets/icons/buygoods-icon.svg'

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

export type Service = {
  name: string
  icon: any
  navigate: string | any
}
export const services: Record<string, Service[]> = {
  Kenya: [
    {
      name: 'Send Money',
      icon: MpesaIcon,
      navigate: 'KenyaSendMoney',
    },
    {
      name: 'Air-time',
      icon: DataIcon,
      navigate: 'KenyaBuyAirtime', // Temporarily point to an existing screen until KenyaAirtime is implemented
    },
    {
      name: 'Buy Goods',
      icon: BuyGoodsIcon,
      navigate: 'KenyaBuyGoods', // Temporarily point to an existing screen until KenyaData is implemented
    },
    {
      name: 'Paybill',
      icon: PaybillIcon,
      navigate: 'KenyaPayBills', // Temporarily point to an existing screen until KenyaPaybill is implemented
    },
  ],
  Uganda: [
    {
      name: 'MTN',
      icon: MTNIcon,
      navigate: 'UgandaAirtime',
    },
  ],
  Nigeria: [
    {
      name: 'Send',
      icon: SendMoneyIcon,
      navigate: 'NigeriaSendMoney',
    },
    {
      name: 'Air-time',
      icon: AirtimeIcon,
      navigate: 'NigeriaAirtime',
    },
  ],
  Ghana: [
    {
      name: 'MTN',
      icon: MTNIcon,
      navigate: 'KenyaSendMoney', // Temporarily point to an existing screen until GhanaMTN is implemented
    },
  ],
}

