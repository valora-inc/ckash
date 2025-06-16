import * as React from 'react'
import tw from 'twrnc'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
import { useSend } from '../../../hooks/useSend'
import { useTokens } from '../../../utils'
import { useWalletClient } from '@divvi/mobile'
import { getRatedAmount } from '../../../lib/cKash'
import debounce from 'lodash.debounce'
import { TokenBalance } from 'src/tokens/slice'
import AlertModal from '../../../components/AlertModal'
import ListIcon from '../../../assets/icons/list-icon.svg'
import NoteIcon from '../../../assets/icons/note-icon.svg'
import PrimaryButton from '../../../components/PrimaryButton'
import InputField from '../../../components/InputField'

export default function MPESABuyGoods(
  _props: RootStackScreenProps<'KenyaBuyGoods'>,
) {
  const [tillNumber, setTillNumber] = React.useState<string>('100')
  const [amount, setAmount] = React.useState<string>('5035')
  const [tokenAmount, setTokenAmount] = React.useState<string>('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })

  const { sendMoney, loading,isError } = useSend()

  const { cUSDToken } = useTokens()

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

  const resetForm = () => {
    setTillNumber('')
    setAmount('')
    setTokenAmount('')
  }

  const handleBuyGoods = async () => {
    try {
      if (!tokenAmount || tokenAmount == null || tokenAmount == undefined) {
        Alert.alert('Please provide Amount')
        return
      }
      const { response } = await sendMoney({
        shortcode: tillNumber,
        ratedTokenAmount: tokenAmount,
        rawAmount: amount,
        type: 'BUY_GOODS',
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

  return (
    <ScrollView
      style={tw`flex-1 bg-qhitw px-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* Form Container */}
      <View
        style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}
      >
        {/* Till / Buy Goods Number Section */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-900 font-medium mb-2`}>
            Till / Buy Goods
          </Text>
          <InputField
            value={tillNumber}
            onChangeText={setTillNumber}
            placeholder="Enter till number"
            keyboardType="numeric"
            icon={<ListIcon width={24} height={24} style={tw`mr-4`} />}
          />
        </View>

        {/* Amount Section */}
        <View style={tw`mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-sm text-gray-900 font-medium`}>Amount</Text>
            <Text style={tw`text-sm font-medium text-sm text-black`}>
              ₦245.31
            </Text>
          </View>
          <View
            style={tw`flex-row items-center bg-white border border-[#DAE3FF] rounded py-2 mb-2 bg-[#DAE3FF]`}
          >
            <TextInput
              style={tw`flex-1 font-size-10 pl-5  text-[#333] `}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="Enter amount"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
            />
          </View>
          <Text style={tw`text-xs text-[#EEA329] font-medium`}>
            (min: 20 max 60,000)
          </Text>
        </View>

        {/* Continue Button */}
 <PrimaryButton onPress={handleBuyGoods} label="Continue" isLoading={loading} />

        {/* Disclaimer */}
        <View style={tw`flex-row items-center`}>
          <NoteIcon width={16} height={16} style={tw`mr-1`} />
          <Text style={tw`text-[10px] text-gray-700 font-medium`}>
            Payment made to the wrong Till number is non-refundable
          </Text>
        </View>
      </View>
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
        accountName={tillNumber ? `Recipient: ${tillNumber}` : ''}
      />
    </ScrollView>
  )
}
