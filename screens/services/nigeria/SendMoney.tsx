import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Clipboard,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { useSend } from "../../../hooks/useSend"
import { useTokens } from "../../../utils"
import { useWalletClient } from '@divvi/mobile'
import { getExchangeRate, getRatedAmount, validateAccount } from "../../../lib/cKash"
import debounce from "lodash.debounce"
import { TokenBalance } from "src/tokens/slice"
import AlertModal from "../../../components/AlertModal"
import { MobileNetwork, NigeriaBanks } from "../../../api/types";
import PrimaryButton from '../../../components/PrimaryButton'
const popularBanks = [
  {
    id: '1',
    name: 'Opay',
    icon: require('../../../assets/opay.png'),
  },
  {
    id: '2',
    name: 'Moniepoint',
    icon: require('../../../assets/moniepoint.png'),
  },
  {
    id: '3',
    name: 'Palmpay',
    icon: require('../../../assets/palmpay.png'),
  },
]

const initialSavedContacts = [
  {
    id: '1',
    name: 'PABLO LEMONR',
    accountNumber: '025457656',
    bank: 'Moniepoint',
  },
  {
    id: '2',
    name: 'PABLO LEMONR',
    accountNumber: '025457656',
    bank: 'Moniepoint',
  },
]

export default function SendMoney(
  _props: RootStackScreenProps<'NigeriaSendMoney'>,
) {
  const [selectedBank, setSelectedBank] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [bankcode, setBankCode] = React.useState('')
 
      const [accountName, setAccountName] = React.useState<string | null>(null)
  const [savedContacts, setSavedContacts] = React.useState(initialSavedContacts)
  
          const [modalVisible, setModalVisible] = React.useState(false)
          const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
          
            const [tokenAmount, setTokenAmount] = React.useState<string>('')
      
          const { sendMoney, loading,error,isError } = useSend()
          
            const { cUSDToken } = useTokens()

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName)
    const bank_code = NigeriaBanks[bankName]
    setBankCode(bank_code)
  }

  const handleAccountNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    setAccountNumber(cleaned)
    // In a real app, you would trigger account name fetch here
  }

  // const handleAmountChange = (text: string) => {
  //   const cleaned = text.replace(/[^0-9]/g, '')
  //   setAmount(cleaned)
  // }

  const addToRecentContacts = () => {
    if (accountNumber && selectedBank) {
      // Check if the account already exists in contacts
      const exists = savedContacts.some(
        (contact) => contact.accountNumber === accountNumber,
      )

      if (!exists) {
        // Create new contact with a unique ID
        const newContact = {
          id: (savedContacts.length + 1).toString(),
          name: accountName || 'Recent Contact',
          accountNumber: accountNumber,
          bank: selectedBank,
        }
        // Add new contact to the beginning of the array
        setSavedContacts([newContact, ...savedContacts])

        // Show feedback
        if (Platform.OS === 'android') {
          ToastAndroid.show('Added to recent contacts!', ToastAndroid.SHORT)
        } else {
          Alert.alert('Success', 'Added to recent contacts!')
        }
      }
    }
  }

  const handleContinue = () => {
    if (!accountNumber || !selectedBank || !amount) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    // Add to recent contacts
    addToRecentContacts()

    // Handle the transfer logic here
    console.log('Processing transfer...')

    // Clear all input fields
    setAccountNumber('')
    setSelectedBank('')
    setAmount('')
    setAccountName('')

    // Show success message
    if (Platform.OS === 'android') {
      ToastAndroid.show('Transaction initiated!', ToastAndroid.SHORT)
    } else {
      Alert.alert('Success', 'Transaction initiated!')
    }
  }

  const copyToClipboard = () => {
    if (accountNumber) {
      Clipboard.setString(accountNumber)
      if (Platform.OS === 'android') {
        ToastAndroid.show('Account number copied!', ToastAndroid.SHORT)
      } else {
        Alert.alert('Copied', 'Account number copied to clipboard!')
      }
    }
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
                    console.log("RATE AMOUNT",ratedAmountToDeduct)
                    const rate = await getExchangeRate("NGN")
                        console.log("RATE RATE",rate)
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
                  
    setSelectedBank('')
    setAmount('')
    setAccountName('')
                
              }


  const account_name = async (account_number: string) => {
          try {
            // Adjust type and mobile_network as needed for your use case
            const result =await  validateAccount({account_number:account_number,bank_code:bankcode,country_code:"NGN"})
            // console.log('THE RESULT', result?.data?.public_name)
            // Assume result.data.name or similar contains the public name
            setAccountName(result || null)
          } catch (error) {
            setAccountName(null)
          }
        }
      
        React.useEffect(() => {
          if (accountNumber.length >=0) {
            // or your validation logic
            account_name(accountNumber)
          } else {
            setAccountName(null)
          }
        }, [accountNumber])
  
  
  const handleSendMoney = async () => {
          try {
            if (!tokenAmount || tokenAmount == null || tokenAmount == undefined) {
              Alert.alert('All Fields required')
              return
            }
            if( !selectedBank){
              Alert.alert('Please Select Mobile Network')
              return
            }  
            const {response } = await sendMoney({
              //shortcode: accountNumber,
              account_name:accountName as string,
              ratedTokenAmount: tokenAmount,
              rawAmount: amount,
              country_code:"NGN",
              account_number: accountNumber,
              bank_code: bankcode,
              bank_name:selectedBank,
              //type:"MOBILE",
              mobileNetwork: selectedBank as MobileNetwork,
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Popular Banks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Banks</Text>
          <View style={styles.popularBanks}>
            {popularBanks.map((bank) => (
              <Pressable
                key={bank.id}
                style={styles.bankButton}
                onPress={() => handleBankSelect(bank.name)}
              >
                <View style={styles.bankIconContainer}>
                  <Image source={bank.icon} style={styles.bankIcon} />
                </View>
                <Text style={styles.bankName}>{bank.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bank Selection Card */}
        <Card style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>All Banks</Text>
            <TouchableOpacity style={styles.bankSelect}>
              <Text
                style={[
                  styles.bankSelectText,
                  !selectedBank && styles.placeholderText,
                ]}
              >
                {selectedBank || 'Select a Bank'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Number</Text>
            <View style={styles.accountInputContainer}>
              <TextInput
                style={styles.input}
                value={accountNumber}
                onChangeText={handleAccountNumberChange}
                placeholder="Enter account Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity onPress={copyToClipboard}>
                <Image
                  source={require('../../../assets/copy.png')}
                  style={styles.copyIcon}
                />
              </TouchableOpacity>
            </View>
            {accountName && (
              <Text style={styles.accountName}>
                Account name: {accountName}
              </Text>
            )}
          </View>
        </Card>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Enter Amount (NGN)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="100"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.minAmount}>(min. 200 max 60,000)</Text>
        </View>

        {/* Saved Contacts */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Contact</Text>
            <TouchableOpacity>
              <Text style={styles.recentContact}>Recent Contact</Text>
            </TouchableOpacity>
          </View>
          {savedContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => {
                setAccountNumber(contact.accountNumber)
                setSelectedBank(contact.bank)
                setAccountName(contact.name)
              }}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactAccount}>
                  {contact.accountNumber}
                </Text>
              </View>
              <View style={styles.bankBadge}>
                <Text style={styles.bankBadgeText}>
                  {contact.bank.charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Continue Button */}
       <PrimaryButton onPress={handleSendMoney} label="Continue" isLoading={loading} />
      </View>
      <AlertModal
                          visible={modalVisible}
                          onClose={() => {
                            setModalVisible(false)
                            resetForm()
                          }}
                          title={isError?"Transaction Failed":"Transaction Successful"}
                          amount={amount ? `Amount: ${amount} GHS` : ''}
                          iconType={isError?"error":"success"}
                          loading={loading}
                          accountName={accountName ? `Recipient: ${accountName}` : ''}
                        />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B1A46',
    marginBottom: 12,
  },
  popularBanks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  bankButton: {
    alignItems: 'center',
    width: '30%',
  },
  bankIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bankIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bankName: {
    fontSize: 12,
    color: '#1B1A46',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#1B1A46',
    marginBottom: 8,
    fontWeight: '500',
  },
  bankSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  bankSelectText: {
    fontSize: 16,
    color: '#1B1A46',
  },
  placeholderText: {
    color: '#A0A0A0',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  accountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    color: '#1B1A46',
  },
  copyIcon: {
    width: 24,
    height: 24,
    tintColor: '#6B7280',
  },
  accountName: {
    fontSize: 14,
    color: '#1B1A46',
    marginTop: 8,
  },
  amountContainer: {
    marginBottom: 24,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  currencySymbol: {
    fontSize: 16,
    color: '#1B1A46',
    paddingLeft: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    color: '#1B1A46',
  },
  minAmount: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    color: '#1B1A46',
    fontWeight: '500',
    marginBottom: 4,
  },
  contactAccount: {
    fontSize: 12,
    color: '#6B7280',
  },
  bankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0034BB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  recentContact: {
    fontSize: 14,
    color: '#0034BB',
  },
  continueButton: {
    backgroundColor: '#0034BB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
})
