import * as React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
// import Card from "../../../components/ui/Card"
// import Button from "../../../components/ui/Button"
import {
  //   usePublicClient,
  //   useWallet,
  useWalletClient,
  //   unlockAccount,
  //   navigate,
  //   TransactionRequest,
  //   prepareTransactions,
  //   PreparedTransactionsNotEnoughBalanceForGas,
  //   sendTransactions,
  //   getFees,
  //   usePrepareTransactions,
} from '@divvi/mobile'
// import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem"
import { celo } from 'viem/chains'
import { useTokens } from '../../../utils'
// import { TokenBalance } from "src/tokens/slice"
// import { Pretium_api } from "../../../constants/index"
import ContactIcon from "../../../assets/icons/contact-icon.svg"
import {
    calculateTotalUsdValue,
  executeCKashTransaction,
  getExchangeRate,
  getRatedAmount,
  getRatedAmountToLocalCurrency,
  sendTransactionStable,
} from '../../../lib/cKash'
import { PRETIUM_ADDRESS } from '../../../constants'
import { TokenBalance } from 'src/tokens/slice'
import tw from 'twrnc'
import ContactList from '../../../components/ContactList'

interface SavedContact {
  phone: string
  name: string
}

interface AmountOption {
  value: number
  label: string
}

export default function BuyAirtime(
  _props: RootStackScreenProps<'KenyaBuyAirtime'>,
) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(
    null,
  )
  const [customAmount, setCustomAmount] = React.useState<string>('')
  const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')

  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
  const [localBalance, setLocalBalance] = React.useState<number>(0.0)

  const { tokens, cUSDToken } = useTokens()

  const amountOptions: AmountOption[] = [
    { value: 100, label: 'KES 100' },
    { value: 200, label: 'KES 200' },
    { value: 500, label: 'KES 500' },
    { value: 1000, label: 'KES 1000' },
    { value: 2000, label: 'KES 2000' },
    { value: 5000, label: 'KES 5000' },
  ]

  const [savedContacts] = React.useState<SavedContact[]>([
    { phone: '0701707772', name: 'Ronex' },
    { phone: '0703449363', name: 'Saint Brisa' },
  ])

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    // Format as XXXX XXX XXXX
    const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')
    setPhoneNumber(formatted)
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(text)
    setSelectedAmount(null)
  }

  const handleBuyAirtime = async () => {
    try {
      const amount = selectedAmount || parseFloat(customAmount)
      if (!amount || !phoneNumber) {
        Alert.alert('Error', 'Please select an amount and enter phone number')
        return
      }

      if (true) {
        const calculatedAmount = await getRatedAmount(amount, 'KES')

        const txHash = await sendTransactionStable({
          to: cUSDToken?.address as `0x${string}`,
          recipient: PRETIUM_ADDRESS as `0x${string}`,
          from: walletClient?.account?.address as `0x${string}`,
          amount: calculatedAmount.toString(),
          feeCurrency: cUSDToken?.address as `0x${string}`,
          tokenBalance: cUSDToken as TokenBalance,
          type: 'cip64',
        })
        console.log('The txHash is ', txHash)
        Alert.alert('Success', `Airtime purchase successful! Hash: ${txHash}`)
      }
    } catch (error) {
      console.log('THE ERROR', error)
      Alert.alert('Error', `Transaction failed: ${error}`)
    }
  }

  const selectContact = (contact: SavedContact) => {
    setPhoneNumber(contact.phone)
  }

  React.useEffect(() => {
    if (!tokens || tokens.length === 0) return
    let totalUsdValue = calculateTotalUsdValue(tokens)
    getRatedAmountToLocalCurrency(Number(totalUsdValue), 'KES').then((value:any) =>
      setLocalBalance(Number(value)),
    )
  }, [tokens])

  return (
    <ScrollView
      style={tw`flex-1 bg-[#F5F7FA] px-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={tw`flex-row items-center py-4  ml-4 mb-2`}>
        <Text style={tw`text-lg font-bold`}>Buy Airtime</Text>
      </View>

      {/* Amount Selection Card */}
      <View
        style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}
      >
        <Text style={tw`text-sm text-gray-700 font-medium mb-2`}>
          Choose Amount (KES)
        </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {amountOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw` rounded-lg p-4 w-[31%] border border-[#B2C7FF] rounded  mb-2 bg-[#DAE3FF]`,
                selectedAmount === option.value && tw`bg-[#2B5CE6]`,
              ]}
              onPress={() => handleAmountSelect(option.value)}
            >
              <Text
                style={[
                  tw`text-sm font-medium text-sm text-black`,
                  selectedAmount === option.value && tw`text-white`,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount Input */}
        <View style={tw`mt-2`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-sm ttext-gray-700 font-medium`}>
              Input an Amount (KES)
            </Text>
            <Text style={tw`text-sm font-medium text-sm text-black`}>
              KES {localBalance}
            </Text>
          </View>
          <TextInput
            style={tw`bg-white border border-[#B2C7FF] rounded px-4 py-4 mb-1 bg-[#DAE3FF]`}
            value={customAmount}
            onChangeText={handleCustomAmountChange}
            placeholder="KES 100"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Phone Number Input */}
      <View style={tw` p-4 mb-4`}>
        <Text style={tw`text-sm text-gray-700 font-medium mb-2`}>
          Phone Number
        </Text>
        <View
          style={tw`flex-row items-center bg-white border border-[#DAE3FF] rounded py-2 mb-2 bg-[#DAE3FF]`}
        >
          <TextInput
            style={tw`flex-1 font-size-10 pl-5  text-[#333] `}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="0816 057 3659"
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            maxLength={13}
          />
          <ContactIcon width={24} height={24} style={tw`mr-4`} />
        </View>
        <Text style={tw`text-sm text-gray-700 font-medium`}>
          📶 All mobile networks are supported
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={tw`bg-[#2B5CE6] rounded-lg p-4 mb-4`}
        onPress={handleBuyAirtime}
      >
        <Text style={tw`text-white text-center font-semibold text-lg`}>
          Continue
        </Text>
      </TouchableOpacity>

      {/* Contacts Section */}
      <ContactList
        contacts={savedContacts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onContactSelect={selectContact}
      />
    </ScrollView>
  )
}
