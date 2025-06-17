import * as React from 'react'
import tw from 'twrnc'
import {
  View,
  TextInput,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
import { useWalletClient } from '@divvi/mobile'
import { TransactionRequestEIP1559 } from 'viem'
import { TransactionRequestCIP64 } from 'viem/chains'
import debounce from 'lodash.debounce'
import { useTokens } from '../../../utils'
import { TokenBalance } from 'src/tokens/slice'
import {
  calculateTotalUsdValue,
  getRatedAmount,
  getRatedAmountToLocalCurrency,
  validateAccount,
} from '../../../lib/cKash'
import { useSend } from '../../../hooks/useSend'
import AlertModal from '../../../components/AlertModal'
import MpesaIcon from '../../../assets/icons/mpesa-icon.svg'
import ContactListIcon from '../../../assets/icons/list-icon.svg'
import ContactList from '../../../components/ContactList'
import PrimaryButton from '../../../components/PrimaryButton'
import InputField from '../../../components/InputField'

export type TransactionRequest = (
  | TransactionRequestCIP64
  | TransactionRequestEIP1559
) & {
  _estimatedGasUse?: bigint
  _baseFeePerGas?: bigint
}

interface Contact {
  phone: string
  name: string
}

export default function SendMoney(
  _props: RootStackScreenProps<'KenyaSendMoney'>,
) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
  const [amount, setAmount] = React.useState<string>('')
  const [tokenAmount, setTokenAmount] = React.useState<string>('')
  const { sendMoney, loading,error ,isError} = useSend()
  const [localBalance, setLocalBalance] = React.useState<number>(0.0)

  const { tokens, cUSDToken } = useTokens()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [accountName, setAccountName] = React.useState<string | null>(null)

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    setPhoneNumber(cleaned)
  }

  const fetchTokenAmount = React.useCallback(
    debounce(async (text: string) => {
      const numericValue = parseFloat(text)
      if (isNaN(numericValue)) {
        setTokenAmount('0')
        return
      }

      try {
        const ratedAmountToDeduct = await getRatedAmount(numericValue, 'KES')
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
  const handleSendMoney = async () => {
    try {
      if (!tokenAmount || tokenAmount == null || tokenAmount == undefined) {
        Alert.alert('Please provide Amount')
        return
      }
      const { response } = await sendMoney({
        shortcode: phoneNumber,
        ratedTokenAmount: tokenAmount,
        rawAmount: amount,
        type: 'MOBILE',
        mobileNetwork: 'Safaricom',
        tokenBalance: cUSDToken as TokenBalance,
        from: walletClient?.account?.address as `0x${string}`,
        to: cUSDToken?.address as `0x${string}`,
        feeCurrency: cUSDToken?.address as `0x${string}`,
      })
      console.log('THE RESPONSE', response)
      setModalVisible(true)
    } catch (error) {
      console.log('THE ERROR', error)
      Alert.alert(`${error}`)
    }
  }
 

  const account_name = async (shortcode: string) => {
    try {
     
      const result = await validateAccount({
        shortcode: shortcode,
        mobile_network: 'Safaricom',
      })
      
      setAccountName(result || null)
    } catch (error) {
      setAccountName(null)
    }
  }

  React.useEffect(() => {
    if (phoneNumber.length >= 10) {
      
      account_name(phoneNumber)
    } else {
      setAccountName(null)
    }
  }, [phoneNumber])

  const resetForm = () => {
    setPhoneNumber('')
    setAmount('')
    setTokenAmount('')
    setAccountName(null)
  }

  React.useEffect(() => {
    if (!tokens || tokens.length === 0) return
    let totalUsdValue = calculateTotalUsdValue(tokens)
    getRatedAmountToLocalCurrency(Number(totalUsdValue), 'KES').then((value) =>
      setLocalBalance(Number(value)),
    )
  }, [tokens])
  return (
    <ScrollView
      style={tw`flex-1 bg-[#F5F7FA] px-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* Bank Selection Card */}
      <View
        style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}
      >
        <Text style={tw`text-left font-medium text-sm  mb-2 text-[#1B1A46]`}>
          Select Bank
        </Text>
        <View style={tw`flex flex-coljustify-start`}>
          <MpesaIcon width={200} height={40} />
          <Text style={tw`ml-20 mt-1 font-medium text-sm text-[#1B1A46]`}>
            M-pesa
          </Text>
        </View>

        <Text
          style={tw`text-left mt-6 mb-2 font-medium text-sm text-[#1B1A46]`}
        >
          Mobile Number
        </Text>
        <InputField
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          placeholder="0701707772"
          keyboardType="phone-pad"
          maxLength={15}
          icon={<ContactListIcon width={24} height={24} style={tw`mr-4`} />}
        />
        {phoneNumber && (
          <Text style={tw`text-left font-medium text-sm text-[#1B1A46]`}>
            Account name: {accountName}
          </Text>
        )}
      </View>

      {/* Amount Input */}
      <View style={tw` mb-4`}>
        <View style={tw`flex-row justify-between items-center my-2`}>
          <Text style={tw`text-left font-medium text-sm text-[#1B1A46]`}>
            Enter Amount (KES)
          </Text>
          <Text style={tw`text-left font-medium text-sm text-[#1B1A46]`}>
            KES {localBalance}
          </Text>
        </View>
        <TextInput
          style={tw`bg-white border border-[#B2C7FF] rounded px-4 py-4 mb-1 bg-[#DAE3FF]`}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="KES 100"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
        />
        <Text style={tw`text-[#EEA329] text-xs`}>(min. 20 max 250,000)</Text>
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
        amount={amount ? `Amount: ${amount} KES` : ''}
        iconType={isError?"error":"success"}
        loading={loading}
        accountName={accountName ? `Recipient: ${accountName}` : ''}
      />
    </ScrollView>
  )
}
