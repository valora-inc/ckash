import { useState } from 'react'
import { useSendTransactionStable } from './useSendTransactionStable'
import { PRETIUM_ADDRESS, Pretium_api } from '../constants/index'
import { TokenBalance } from '@divvi/mobile/src/tokens/slice'

type MobileNetwork = 'Safaricom' | 'MTN' | 'Airtel' | 'AirtelTigo' | 'Telcel'

interface SendMoneyProps {
  phoneNumber: string
  rawAmount?: string
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
    phoneNumber,
    rawAmount,
    ratedTokenAmount,
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
        shortcode: phoneNumber,
        type: 'MOBILE',
        transaction_hash: txHash,
        amount: rawAmount as string,
      })

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
