import * as React from 'react'
import {
  View,
  StyleSheet,
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
import { getRatedAmount, validateAccount } from '../../../lib/cKash'
import { useSend } from '../../../hooks/useSend'
import AlertModal from '../../../components/AlertModal'
import { Pretium_api } from '../../../constants'

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
  const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')
  const [savedContacts] = React.useState<Contact[]>([
    { phone: '254700000000', name: 'John Doe' },
    { phone: '254711111111', name: 'Jane Smith' },
  ])

  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
  const [amount, setAmount] = React.useState<string>('')
  const [tokenAmount, setTokenAmount] = React.useState<string>('')
  const { sendMoney, loading } = useSend()

  const { cUSDToken } = useTokens()
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
      const {response } = await sendMoney({
        shortcode: phoneNumber,
        ratedTokenAmount: tokenAmount,
        rawAmount: amount,
        type:"MOBILE",
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
  function selectContact(contact: Contact): void {
    setPhoneNumber(contact.phone)
  }

  const account_name = async (shortcode: string) => {
    try {
      // Adjust type and mobile_network as needed for your use case
      const result =await  validateAccount(shortcode,"Safaricom")
      // console.log('THE RESULT', result?.data?.public_name)
      // Assume result.data.name or similar contains the public name
      setAccountName(result || null)
    } catch (error) {
      setAccountName(null)
    }
  }

  React.useEffect(() => {
    if (phoneNumber.length >= 10) {
      // or your validation logic
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
      </View>

      {/* Bank Selection Card */}
      <View style={styles.bankCard}>
        <Text style={styles.bankLabel}>Select Bank</Text>
        <View style={styles.bankSelector}>
          <View style={styles.mpesaContainer}>
            <Text style={styles.mpesaText}>M-</Text>
            <Text style={[styles.mpesaText, styles.mpesaGreen]}>PESA</Text>
          </View>
          <Text style={styles.mpesaSubtext}>Mpesa</Text>
        </View>
      </View>

      {/* Account Input Card */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Account Number/Mobile Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="Enter account Number"
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            maxLength={15}
          />
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactIcon}>📞</Text>
          </TouchableOpacity>
        </View>
        {phoneNumber && (
          <Text style={styles.accountName}>Account name: {accountName}</Text>
        )}
      </View>

      {/* Amount Input */}
      <View style={styles.amountSection}>
        <View style={styles.amountHeader}>
          <Text style={styles.amountLabel}>Enter Amount (KES)</Text>
          <Text style={styles.amountDisplay}>KES 245.31</Text>
        </View>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="KES 100"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
        />
        <Text style={styles.amountLimit}>(min. 20 max 60,000)</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleSendMoney}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Contacts Section */}
      <View style={styles.contactsSection}>
        <View style={styles.contactsHeader}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'saved' && styles.activeTabText,
              ]}
            >
              Saved Contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
            onPress={() => setActiveTab('recent')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'recent' && styles.activeTabText,
              ]}
            >
              Recent Contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Contact List */}
        <View style={styles.contactsList}>
          {savedContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => selectContact(contact)}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
                <Text style={styles.contactName}>{contact.name}</Text>
              </View>
              <View style={styles.contactAvatar}>
                <Text style={styles.avatarText}>M</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          resetForm()
        }}
        title="Transaction Successful"
        amount={amount ? `Amount: ${amount} KES` : ''}
        iconType="success"
        loading={loading}
        accountName={accountName ? `Recipient: ${accountName}` : ''}
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  bankCard: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  bankLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bankSelector: {
    alignItems: 'flex-start',
  },
  mpesaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mpesaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  mpesaGreen: {
    color: '#00AA00',
  },
  mpesaSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  inputCard: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  contactButton: {
    padding: 4,
  },
  contactIcon: {
    fontSize: 16,
    color: '#2B5CE6',
  },
  accountName: {
    fontSize: 12,
    color: '#2B5CE6',
    marginTop: 8,
  },
  amountSection: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
  },
  amountDisplay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  amountInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
    marginBottom: 8,
  },
  amountLimit: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  continueButton: {
    backgroundColor: '#2B5CE6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  contactsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2B5CE6',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2B5CE6',
    fontWeight: '600',
  },
  moreButton: {
    marginLeft: 'auto',
  },
  moreIcon: {
    fontSize: 16,
  },
  contactsList: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactName: {
    fontSize: 12,
    color: '#666',
  },
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2B5CE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  linkContainer: {
    marginBottom: 8,
  },
  linkText: {
    color: '#2979FF',
    textDecorationLine: 'underline',
    fontSize: 15,
    textAlign: 'center',
  },
})
