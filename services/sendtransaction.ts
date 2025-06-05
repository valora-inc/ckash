import {
  encodeFunctionData,
  erc20Abi,
  parseUnits,
  TransactionRequestEIP1559,
} from 'viem'
import { TransactionRequestCIP64 } from 'viem/chains'
import {
  usePublicClient,
  useWallet,
  useWalletClient,
  unlockAccount,
  navigate,
  prepareTransactions,
  PreparedTransactionsNotEnoughBalanceForGas,
  PreparedTransactionsPossible,
  sendTransactions,
  getFees,
  usePrepareTransactions,
} from '@divvi/mobile'
import { Alert } from 'react-native'
import { TokenBalance } from 'src/tokens/slice'

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
