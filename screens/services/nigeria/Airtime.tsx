import * as React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
import { useWalletClient } from '@divvi/mobile'
import { useTokens } from '../../../utils'
import {
  calculateTotalUsdValue,
  getRatedAmount,
  getRatedAmountToLocalCurrency,
  sendTransactionStable,
} from '../../../lib/cKash'
import { PRETIUM_ADDRESS } from '../../../constants'
import { TokenBalance } from 'src/tokens/slice'
import tw from 'twrnc'
import ContactList from '../../../components/ContactList'
import PrimaryButton from '../../../components/PrimaryButton'
import InputField from '../../../components/InputField'
import NoteIcon from '../../../assets/icons/note-icon.svg'
import ContactIcon from '../../../assets/icons/contact-icon.svg'

interface SavedContact {
  phone: string
  name: string
}

interface AmountOption {
  value: number
  label: string
}

export default function Airtime(
  _props: RootStackScreenProps<'NigeriaAirtime'>,
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
    { value: 100, label: 'NGN 100' },
    { value: 200, label: 'NGN 200' },
    { value: 500, label: 'NGN 500' },
    { value: 1000, label: 'NGN 1000' },
    { value: 2000, label: 'NGN 2000' },
    { value: 5000, label: 'NGN 5000' },
  ]

  const savedContacts: SavedContact[] = [
    { phone: '08160573659', name: 'PABLO LEMONR' },
    { phone: '07034493632', name: 'JOHN DOE' },
  ]

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

      const calculatedAmount = await getRatedAmount(amount, 'NGN')

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
    getRatedAmountToLocalCurrency(Number(totalUsdValue), 'NGN').then(
      (value: any) => setLocalBalance(Number(value)),
    )
  }, [tokens])

  return (
    <ScrollView
      style={tw`flex-1 bg-[#F5F7FA] px-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* Amount Selection Card */}
      <View
        style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}
      >
        <Text style={tw`text-sm text-gray-700 font-medium mb-2`}>
          Choose Amount (NGN)
        </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {amountOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw`rounded-lg p-4 w-[31%] border border-[#B2C7FF] rounded mb-2 bg-[#DAE3FF]`,
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
            <Text style={tw`text-sm text-gray-700 font-medium`}>
              Input an Amount (NGN)
            </Text>
            <Text style={tw`text-sm font-medium text-sm text-black`}>
              NGN {localBalance}
            </Text>
          </View>
          <TextInput
            style={tw`bg-white border border-[#B2C7FF] rounded px-4 py-4 mb-1 bg-[#DAE3FF]`}
            value={customAmount}
            onChangeText={handleCustomAmountChange}
            placeholder="NGN 100"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Phone Number Input */}
      <View style={tw`p-4 mb-4`}>
        <Text style={tw`text-sm text-gray-700 font-medium mb-2`}>
          Phone Number
        </Text>
        <InputField
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          placeholder="0816 057 3659"
          keyboardType="phone-pad"
          maxLength={13}
          icon={<ContactIcon width={24} height={24} style={tw`mr-4`} />}
        />
        <View style={tw`flex-row items-center`}>
          <NoteIcon width={16} height={16} style={tw`mr-1`} />
          <Text style={tw`text-[10px] text-gray-700 font-medium`}>
            All mobile networks are supported
          </Text>
        </View>
      </View>

      {/* Continue Button */}
      <PrimaryButton onPress={handleBuyAirtime} label="Continue" />

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
