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
import { useSend } from '../../../hooks/useSend'
import { useTokens } from '../../../utils'
import { useWalletClient } from '@divvi/mobile'
import {
  getExchangeRate,
  getRatedAmount,
  getRatedAmountToLocalCurrency,
  calculateTotalUsdValue,
  validateAccount,
} from '../../../lib/cKash'
import debounce from 'lodash.debounce'
import { TokenBalance } from 'src/tokens/slice'
import AlertModal from '../../../components/AlertModal'
import { MobileNetwork, NigeriaBanks } from '../../../api/types'
import tw from 'twrnc'
import ContactList from '../../../components/ContactList'
import PrimaryButton from '../../../components/PrimaryButton'
import InputField from '../../../components/InputField'
import ContactListIcon from '../../../assets/icons/list-icon.svg'
import OpayIcon from '../../../assets/icons/opay-icon.svg'
import MoniepointIcon from '../../../assets/icons/moniepoint-icon.svg'
import PalmpayIcon from '../../../assets/icons/palmpay-icon.svg'
interface Contact {
  phone: string
  name: string
}

interface Bank {
  id: string
  name: string
  logo: React.ComponentType<any>
}

export default function SendMoney(
  _props: RootStackScreenProps<'NigeriaSendMoney'>,
) {
  const [selectedBank, setSelectedBank] = React.useState<Bank | null>(null)
  const [accountNumber, setAccountNumber] = React.useState<string>('')
  const [accountName, setAccountName] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')
  const [amount, setAmount] = React.useState<string>('')
  const [bankcode, setBankCode] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
  const [tokenAmount, setTokenAmount] = React.useState<string>('')
  const [localBalance, setLocalBalance] = React.useState<number>(0.0)
  const { sendMoney, loading,isError } = useSend()
  const { tokens, cUSDToken } = useTokens()

  const banks: Bank[] = [
    { id: 'opay', name: 'Opay', logo: OpayIcon },
    { id: 'moniepoint', name: 'Moniepoint', logo: MoniepointIcon },
    { id: 'palmpay', name: 'Palmpay', logo: PalmpayIcon },
  ]

  const savedContacts: Contact[] = [
    { phone: '09012345678', name: 'PABLO LEMONR' },
    { phone: '08098765432', name: 'JOHN DOE' },
  ]

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank)
    const bank_code = NigeriaBanks[bank.name]
    setBankCode(bank_code)
  }

  const handleAccountNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    setAccountNumber(cleaned)
  }

  const selectContact = (contact: Contact) => {
    setAccountNumber(contact.phone)
    setAccountName(contact.name)
  }

  const fetchTokenAmount = React.useCallback(
    debounce(async (text: string) => {
      const numericValue = parseFloat(text)
      if (isNaN(numericValue)) {
        setTokenAmount('0')
        return
      }

      try {
        const ratedAmountToDeduct = await getRatedAmount(numericValue, 'NGN')
        console.log('RATE AMOUNT', ratedAmountToDeduct)
        const rate = await getExchangeRate('NGN')
        console.log('RATE RATE', rate)
        setTokenAmount(ratedAmountToDeduct.toString())
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error)
      }
    }, 500), // Delay in ms
    [],
  )

  const handleAmountChange = (text: string) => {
    setAmount(text)
    fetchTokenAmount(text)
  }

  const resetForm = () => {
    setAccountNumber('')
    setAmount('')
    setTokenAmount('')
    setSelectedBank(null)
    setAccountName(null)
  }

  const account_name = async (account_number: string) => {
    try {
      // Adjust type and mobile_network as needed for your use case
      const result = await validateAccount({
        account_number: account_number,
        bank_code: bankcode,
        country_code: 'NGN',
      })
      // console.log('THE RESULT', result?.data?.public_name)
      // Assume result.data.name or similar contains the public name
      setAccountName(result || null)
    } catch (error) {
      setAccountName(null)
    }
  }

  React.useEffect(() => {
    if (accountNumber.length >= 10 && selectedBank) {
      account_name(accountNumber)
    } else {
      setAccountName(null)
    }
  }, [accountNumber, selectedBank])

  React.useEffect(() => {
    if (!tokens || tokens.length === 0) return
    let totalUsdValue = calculateTotalUsdValue(tokens)
    getRatedAmountToLocalCurrency(Number(totalUsdValue), 'NGN').then((value) =>
      setLocalBalance(Number(value)),
    )
  }, [tokens])

  const handleSendMoney = async () => {
    try {
      if (
        !tokenAmount ||
        tokenAmount == null ||
        tokenAmount == undefined ||
        !accountName
      ) {
        Alert.alert('All Fields required')
        return
      }
      if (!selectedBank) {
        Alert.alert('Please Select Bank')
        return
      }
      const { response } = await sendMoney({
        account_name: accountName as string,
        ratedTokenAmount: tokenAmount,
        rawAmount: amount,
        country_code: 'NGN',
        account_number: accountNumber,
        bank_code: bankcode,
        bank_name: selectedBank.name,
        mobileNetwork: selectedBank.name as MobileNetwork,
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

  return (
    <ScrollView
      style={tw`flex-1 bg-[#F5F7FA] px-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* Bank Selection Section */}
      <View
        style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}
      >
        <Text style={tw`text-left font-medium text-sm mb-2 text-[#1B1A46]`}>
          Select Bank
        </Text>
        <View style={tw`flex-row gap-3`}>
          {banks.map((bank) => {
            const LogoComponent = bank.logo
            return (
              <TouchableOpacity
                key={bank.id}
                style={tw`bg-white rounded-lg py-3 px-4 items-center flex-1 border-2 ${
                  selectedBank?.id === bank.id
                    ? 'border-blue-600'
                    : 'border-transparent'
                }`}
                onPress={() => handleBankSelect(bank)}
              >
                <LogoComponent width={24} height={24} style={tw`mb-1`} />
                <Text
                  style={tw`text-xs font-semibold ${
                    selectedBank?.id === bank.id
                      ? 'text-blue-600'
                      : 'text-gray-800'
                  }`}
                >
                  {bank.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text
          style={tw`text-left mt-6 mb-2 font-medium text-sm text-[#1B1A46]`}
        >
          Account Number
        </Text>
        <InputField
          value={accountNumber}
          onChangeText={handleAccountNumberChange}
          placeholder="Enter account number"
          keyboardType="numeric"
          maxLength={10}
          icon={<ContactListIcon width={0} height={0} style={tw`mr-4`} />}
        />

        {accountName && (
          <Text style={tw`text-left mt-2 font-medium text-sm text-[#1B1A46]`}>
            Account name: {accountName}
          </Text>
        )}
      </View>

      {/* Amount Section */}
      <View style={tw`mb-4`}>
        <View style={tw`flex-row justify-between items-center my-2`}>
          <Text style={tw`text-left font-medium text-sm text-[#1B1A46]`}>
            Enter Amount (NGN)
          </Text>
          <Text style={tw`text-left font-medium text-sm text-[#1B1A46]`}>
            NGN {localBalance}
          </Text>
        </View>
        <TextInput
          style={tw`bg-white border border-[#B2C7FF] rounded px-4 py-4 mb-1 bg-[#DAE3FF]`}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="NGN 200"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
        />
        <Text style={tw`text-[#EEA329] text-xs`}>(min: ₦200 max ₦60,000)</Text>
      </View>

      {/* Continue Button */}
           <PrimaryButton onPress={handleSendMoney} label="Continue" isLoading={loading} />

     
      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          resetForm()
        }}
        title={isError?"Transaction Failed":"Transaction Successful"}
        amount={amount ? `Amount: ${amount} NGN` : ''}
        iconType={isError?"error":"success"}
        loading={loading}
        accountName={accountName ? `Recipient: ${accountName}` : ''}
      />
    </ScrollView>
  )
}
