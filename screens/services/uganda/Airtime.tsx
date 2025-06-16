import * as React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { RootStackScreenProps } from '../../types'
import debounce from 'lodash.debounce'
import { useTokens } from '../../../utils'
import { TokenBalance } from 'src/tokens/slice'
import { getExchangeRate, getRatedAmount } from '../../../lib/cKash'
import { useSend } from '../../../hooks/useSend'
import AlertModal from '../../../components/AlertModal'
import { useWalletClient } from '@divvi/mobile'
import tw from 'twrnc'
import ContactList from '../../../components/ContactList'
import PrimaryButton from '../../../components/PrimaryButton'
import InputField from '../../../components/InputField'
import ContactIcon from '../../../assets/icons/contact-icon.svg'
import NoteIcon from '../../../assets/icons/note-icon.svg'

interface SavedContact {
  phone: string
  name: string
}

interface AmountOption {
  value: number
  label: string
}

export default function Airtime(_props: RootStackScreenProps<'UgandaAirtime'>) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(
    null,
  )
  const [customAmount, setCustomAmount] = React.useState<string>('')
  const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')

  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
  const [tokenAmount, setTokenAmount] = React.useState<string>('')
  const { sendMoney, loading } = useSend()
  const { cUSDToken } = useTokens()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [accountName, setAccountName] = React.useState<string | null>(null)

  const amountOptions: AmountOption[] = [
    { value: 100, label: 'USh 100' },
    { value: 200, label: 'USh 200' },
    { value: 500, label: 'USh 500' },
    { value: 1000, label: 'USh 1000' },
    { value: 2000, label: 'USh 2000' },
    { value: 5000, label: 'USh 5000' },
  ]

  const [savedContacts] = React.useState<SavedContact[]>([
    { phone: '0776057365', name: 'PABLO LEMONR' },
    { phone: '0776057366', name: 'JOHN DOE' },
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
    fetchTokenAmount(amount.toString())
    setAccountName('')
  }

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(text)
    setSelectedAmount(null)
    fetchTokenAmount(text)
  }

  const fetchTokenAmount = React.useCallback(
    debounce(async (text: string) => {
      const numericValue = parseFloat(text)
      if (isNaN(numericValue)) {
        setTokenAmount('0')
        return
      }

      try {
        const ratedAmountToDeduct = await getRatedAmount(numericValue, 'UGX')
        const rate = await getExchangeRate('UGX')
        console.log('RATE RATE', rate)
        console.log('THE Rated', ratedAmountToDeduct.toString())
        setTokenAmount(ratedAmountToDeduct.toString())
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error)
      }
    }, 500), // Delay in ms
    [],
  )
  const handleBuyAirtime = async () => {
    try {
      const amount = selectedAmount || parseFloat(customAmount)
      if (!amount || !phoneNumber) {
        Alert.alert('Error', 'Please select an amount and enter phone number')
        return
      }

      if (!tokenAmount) {
        Alert.alert('Error', 'Please wait for amount calculation')
        return
      }

      const { response } = await sendMoney({
        shortcode: phoneNumber,
        ratedTokenAmount: tokenAmount,
        rawAmount: amount.toString(),
        country_code: 'UGX',
        type: 'MOBILE',
        mobileNetwork: 'MTN',
        tokenBalance: cUSDToken as TokenBalance,
        from: walletClient?.account?.address as `0x${string}`,
        to: cUSDToken?.address as `0x${string}`,
        feeCurrency: cUSDToken?.address as `0x${string}`,
      })
      console.log('THE RESPONSE', response)
      setModalVisible(true)
    } catch (error) {
      console.log('THE ERROR', error)
      Alert.alert('Error', `Transaction failed: ${error}`)
    }
  }

  const selectContact = (contact: SavedContact) => {
    setPhoneNumber(contact.phone)
  }

  const resetForm = () => {
    setPhoneNumber('')
    setSelectedAmount(null)
    setCustomAmount('')
    setTokenAmount('')
  }

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
          Choose Amount (USh)
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
              Input an Amount (USh)
            </Text>
            <Text style={tw`text-sm font-medium text-sm text-black`}>
              Token Amount: {tokenAmount}
            </Text>
          </View>
          <InputField
            value={customAmount}
            onChangeText={handleCustomAmountChange}
            placeholder="USh 100"
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
          placeholder="0776 057 3659"
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

      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          resetForm()
        }}
        title="Transaction Successful"
        amount={
          selectedAmount
            ? `Amount: ${selectedAmount} USh`
            : customAmount
              ? `Amount: ${customAmount} USh`
              : ''
        }
        iconType="success"
        loading={loading}
        accountName={accountName ? `Recipient: ${accountName}` : ''}
      />
    </ScrollView>
  )
}
