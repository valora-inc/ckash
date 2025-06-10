import {
  encodeFunctionData,
  erc20Abi,
  parseEther,
  parseUnits,
  TransactionRequestEIP1559,
} from 'viem'
import { celo } from 'viem/chains'
import { CHAIN_ID, PRETIUM_ADDRESS } from '../constants'
import { Pretium_api } from '../constants'
import { TokenBalance } from '@divvi/mobile/src/tokens/slice'

import { TransactionRequestCIP64 } from 'viem/chains'
import {
  //   usePublicClient,
  //   useWallet,
  //   useWalletClient,
  unlockAccount,
  //   navigate,
  //   prepareTransactions,
  //   PreparedTransactionsNotEnoughBalanceForGas,
  //   PreparedTransactionsPossible,
  sendTransactions,
  //   getFees,
  //   usePrepareTransactions,
} from '@divvi/mobile'
import { ACCOUNTVALIDATION } from '../api/types'

export interface SendTransactionProp {
  to: `0x${string}`
  type: 'eip1559' | 'cip64' | undefined
  from: `0x${string}`
  recipient: `0x${string}`
  amount: string
  feeCurrency: `0x${string}`
  tokenDecimal?: number
  tokenBalance: TokenBalance
}

export type TransactionRequest = (
  | TransactionRequestCIP64
  | TransactionRequestEIP1559
) & {
  _estimatedGasUse?: bigint
  _baseFeePerGas?: bigint
}

export const sendTransactionStable = async (send: SendTransactionProp) => {
  let decimal = send.tokenDecimal ? send.tokenDecimal : 18

  const transactionsrequest: TransactionRequest = {
    from: send.from,
    type: send.type,
    to: send.to,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: 'transfer',
      args: [send.recipient, parseUnits(send.amount, decimal)],
    }),

    feeCurrency: send.feeCurrency,
    gas: BigInt(100000),
    maxFeePerGas: BigInt(10000000000),
    //  maxPriorityFeePerGas: BigInt(10000000000),
    //   _estimatedGasUse: BigInt(20000000),
    //   _baseFeePerGas: BigInt(200000000),
  }

  try {
    const unlockResult = await unlockAccount()
    if (unlockResult === 'success') {
      const txHash = await sendTransactions({
        feeCurrency: send.tokenBalance,
        transactions: [transactionsrequest],
        type: 'possible',
      })
      return txHash[0]
    } else if (unlockResult === 'failure') {
      console.warn('Failed to unlock wallet.')
      throw new Error('Failed to unlock Wallet')
    } else if (unlockResult === 'canceled') {
      console.log('User canceled unlock.')
      throw new Error('canceled unlock')
    }
  } catch (error) {
    throw new Error('Failed to send')
  }
}

// Supported currency codes
export type CurrencyCode = 'UGX' | 'KES' | 'GHS' | 'NGN'

interface TransactionParams {
  walletClient: any
  publicClient: any
  token: `0x${string}`
  amount: string
  feeCurrency: `0x${string}`
  currencyCode: CurrencyCode
}

// Exchange rate interfaces
interface ExchangeRateData {
  buying_rate: number
  selling_rate: number
  quoted_rate: number
}

// Reusable exchange rate function
export const getExchangeRate = async (
  currencyCode: CurrencyCode,
): Promise<ExchangeRateData> => {
  try {
    const response = await Pretium_api.exchange_rate(currencyCode)
    if (!response?.data) {
      throw new Error('Invalid exchange rate response')
    }
    return response.data
  } catch (error) {
    console.error(`Error fetching exchange rate for ${currencyCode}:`, error)
    throw error
  }
}

export const executeCKashTransaction = async ({
  walletClient,
  publicClient,
  token,
  amount,
  feeCurrency,
  currencyCode,
}: TransactionParams) => {
  try {
    // Prepare transaction request
    const txRequest = await walletClient?.prepareTransactionRequest({
      chainId: CHAIN_ID,
      to: token,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [PRETIUM_ADDRESS as `0x${string}`, parseEther(amount)],
      }),
      chain: celo,
      account: walletClient?.account,
      feeCurrency,
    })

    if (!txRequest) {
      throw new Error('Failed to prepare transaction')
    }

    // Sign transaction
    const signedTx = await walletClient?.signTransaction(txRequest as any)
    if (!signedTx) {
      throw new Error('Failed to sign transaction')
    }

    // Send transaction
    const txHash = await publicClient?.sendRawTransaction({
      serializedTransaction: signedTx as any,
    })
    if (!txHash) {
      throw new Error('Failed to send transaction')
    }

    // Get exchange rate for amount calculation
    const rate = await getExchangeRate(currencyCode)
    const calculatedAmount =
      parseFloat(amount) * parseFloat(rate.buying_rate.toString())

    return {
      txHash,
      calculatedAmount,
      rate: rate.buying_rate.toString(),
      currencyCode,
    }
  } catch (error) {
    console.error('Transaction error:', error)
    throw error
  }
}

// Helper function to validate amount
export const validateAmount = (amount: string): boolean => {
  const numAmount = parseFloat(amount)
  return !isNaN(numAmount) && numAmount > 0
}

// Helper function to format amount
export const formatAmount = (amount: string): string => {
  return parseFloat(amount).toFixed(2)
}

// Helper function to get currency symbol
export const getCurrencySymbol = (currencyCode: CurrencyCode): string => {
  const symbols: Record<CurrencyCode, string> = {
    KES: 'KSh',
    UGX: 'USh',
    GHS: 'GH₵',
    NGN: 'NGN',
  }
  return symbols[currencyCode]
}

export const getRatedAmount = async (
  amount: number,
  currencyCode: CurrencyCode,
) => {
  const rate = await getExchangeRate(currencyCode)
  const calculatedAmount = amount / parseFloat(rate?.buying_rate.toString())
  return calculatedAmount
}

export const getRatedAmountToLocalCurrency = async (
  amount: number,
  currencyCode: CurrencyCode,
) => {
  const rate = await getExchangeRate(currencyCode)
  const calculatedAmount = (amount * rate?.buying_rate).toFixed(2)
  return calculatedAmount
}

export const getAmountToLocalCurrency = async (
  amount: number,
  currencyCode: CurrencyCode,
) => {
  const rate = await getExchangeRate(currencyCode)
  console.log('RATE RATE', rate)

  const calculatedAmount = amount * parseFloat(rate?.buying_rate.toString())
  return calculatedAmount
}

export const validateAccount = async (validation: ACCOUNTVALIDATION) => {
  console.log('THE DETAILS', validation)
  const result = await Pretium_api.account_validation({
    shortcode: validation.shortcode,
    type: validation.type || 'MOBILE',
    mobile_network: validation.mobile_network,
    bank_code: validation.bank_code,
    account_number: validation.account_number,
    country_code: validation.country_code,
  })
  console.log(
    'THE RESULT',
    result?.data?.public_name || result?.data?.account_name,
  )
  return result?.data?.public_name || result?.data?.account_name
}

// Reusable function to calculate total USD value from a token array
export function calculateTotalUsdValue(
  tokens: Array<{ balance: any; lastKnownPriceUsd: any }>,
): number {
  if (!tokens || tokens.length === 0) return 0
  const totalValueInUsd = tokens.reduce((total, token) => {
    const balance = parseFloat(token.balance || '0')
    const price = parseFloat(token.lastKnownPriceUsd || '0')
    if (isNaN(balance) || isNaN(price) || balance === 0 || price === 0) {
      return total
    }
    return total + balance * price
  }, 0)
  return parseFloat(totalValueInUsd.toFixed(4))
}

// export const sendTransactionStable = async (send: SendTransactionProp) => {
//   let decimal = send.tokenDecimal ? send.tokenDecimal : 18

//   const transactionsrequest: TransactionRequest = {
//     from: send.from,
//     type: send.type,
//     to: send.to,
//     data: encodeFunctionData({
//       abi: erc20Abi,
//       functionName: 'transfer',
//       args: [send.recipient, parseUnits(send.amount, decimal)],
//     }),

//     feeCurrency: send.feeCurrency,
//     gas: BigInt(100000),
//     maxFeePerGas: BigInt(10000000000),
//     //  maxPriorityFeePerGas: BigInt(10000000000),
//     //   _estimatedGasUse: BigInt(20000000),
//     //   _baseFeePerGas: BigInt(200000000),
//   }

//   try {
//     const unlockResult = await unlockAccount()
//     if (unlockResult === 'success') {
//       const txHash = await sendTransactions({
//         feeCurrency: send.tokenBalance,
//         transactions: [transactionsrequest],
//         type: 'possible',
//       })
//       return txHash[0]
//     } else if (unlockResult === 'failure') {
//       console.warn('Failed to unlock wallet.')
//       throw new Error('Failed to unlock Wallet')
//     } else if (unlockResult === 'canceled') {
//       console.log('User canceled unlock.')
//       throw new Error('canceled unlock')
//     }
//   } catch (error) {
//     throw new Error('Failed to send')
//   }
// }
