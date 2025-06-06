import { useState } from 'react'
import { useSendTransactionStable } from './useSendTransactionStable'
import { PRETIUM_ADDRESS, Pretium_api } from '../constants/index'
import { TokenBalance } from '@divvi/mobile/src/tokens/slice'
import { CountryCodes, PaymentType } from '../api/types'

type MobileNetwork = 'Safaricom' | 'MTN' | 'Airtel' | 'AirtelTigo' | 'Telcel' 

// transaction_hash:string, i.e "0x75674743763476734677567"
//  * type:"PAYBILL",
//  * shortcode:string , i.e "247247"
//  * account_number:string, i.e "0701707772"
//  * amount:string  , i.e "5000"
interface SendMoneyProps {
  shortcode: string
  rawAmount?: string
  account_number?:string
  country_code?:CountryCodes
  type:PaymentType
  account_name?:string
  ratedTokenAmount?: string
  mobileNetwork: MobileNetwork
  tokenBalance: TokenBalance
  from: `0x${string}`
  to: `0x${string}`
  feeCurrency: `0x${string}`
}

export const useSend = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendStableToken } = useSendTransactionStable()

  const sendMoney = async ({
     shortcode,
     type,
    rawAmount,
    account_number,
    country_code,
    ratedTokenAmount,
    account_name,
    mobileNetwork,
    tokenBalance,
    from,
    to,
    feeCurrency,
  }: SendMoneyProps) => {
    try {
      setLoading(true)
      setError(null)

      // Send the on-chaintransaction
      const txHash = await sendStableToken({
        from,
        to,
        tokenBalance,
        type: 'cip64',
        recipient: PRETIUM_ADDRESS,
        amount: ratedTokenAmount as string,
        feeCurrency,
      })
      if (!txHash) {
        throw new Error('Transaction failed')
      }
      

      // Make the payment prof to Pretium API
      const response = await Pretium_api.make_payment({
        mobile_network: mobileNetwork,
        shortcode: shortcode,
        type: type,//'MOBILE',
        account_number:account_number,
        transaction_hash: txHash,
        amount: rawAmount as string,
        country_code:country_code,
        account_name:account_name
      })
      console.log("THE ACCOUNT Name",account_name)
       console.log("Country Code",country_code)
       console.log ("THE RESPONSE CODE",response.code)
       if(response.code === "200"){
         setError( 'Transaction Failed try again')

       }
      

      return { txHash, response }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    sendMoney,
    loading,
    error,
  }
}
