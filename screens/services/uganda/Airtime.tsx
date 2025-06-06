import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Clipboard,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native'
import { RootStackScreenProps } from '../../types'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const PRESET_AMOUNTS = [
  { value: '100', display: 'USh100' },
  { value: '200', display: 'USh200' },
  { value: '500', display: 'USh500' },
  { value: '1000', display: 'USh1000' },
  { value: '2000', display: 'USh2000' },
  { value: '5000', display: 'USh5000' },
]

// Move savedContacts to state to make it mutable
const initialSavedContacts = [
  {
    phoneNumber: '0776 057 3659',
    name: 'PABLO LEMONR',
  },
  {
    phoneNumber: '0776 057 3659',
    name: 'PABLO LEMONR',
  },
  {
    phoneNumber: '0776 057 3659',
    name: 'PABLO LEMONR',
  },
  {
    phoneNumber: '0776 057 3659',
    name: 'PABLO LEMONR',
  },
]

export default function Airtime(_props: RootStackScreenProps<'UgandaAirtime'>) {
  const [amount, setAmount] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [savedContacts, setSavedContacts] = React.useState(initialSavedContacts)

  const handleAmountPress = (value: string) => {
    setAmount(value)
  }

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '')
    setAmount(cleaned)
  }

  const handlePhoneNumberChange = (text: string) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '')

    // Format the phone number as user types
    let formatted = cleaned
    if (cleaned.length > 4 && cleaned.length <= 7) {
      formatted = cleaned.replace(/(\d{4})(\d{1,3})/, '$1 $2')
    } else if (cleaned.length > 7) {
      formatted = cleaned.replace(/(\d{4})(\d{3})(\d{1,4})/, '$1 $2 $3')
    }

    setPhoneNumber(formatted)
  }

  const copyToClipboard = () => {
    if (phoneNumber) {
      Clipboard.setString(phoneNumber)
      if (Platform.OS === 'android') {
        ToastAndroid.show('Phone number copied!', ToastAndroid.SHORT)
      } else {
        Alert.alert('Copied', 'Phone number copied to clipboard!')
      }
    }
  }

  const addToRecentContacts = () => {
    if (phoneNumber) {
      // Check if the number already exists in contacts
      const exists = savedContacts.some(
        (contact) => contact.phoneNumber === phoneNumber,
      )

      if (!exists) {
        // Add new contact to the beginning of the array
        const newContact = {
          phoneNumber: phoneNumber,
          name: 'Recent Contact', // Default name for recent contacts
        }
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
    if (!phoneNumber || !amount) {
      Alert.alert('Error', 'Please enter both phone number and amount')
      return
    }

    // Add to recent contacts
    addToRecentContacts()

    // Process the airtime purchase
    console.log('Processing airtime purchase...')

    // Clear input fields
    setPhoneNumber('')
    setAmount('')

    // Show success message
    if (Platform.OS === 'android') {
      ToastAndroid.show('Airtime purchase initiated!', ToastAndroid.SHORT)
    } else {
      Alert.alert('Success', 'Airtime purchase initiated!')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Amount Selection */}
        <Card style={styles.card}>
          <Text style={styles.label}>Choose Amount (USh)</Text>
          <View style={styles.amountGrid}>
            {PRESET_AMOUNTS.map((preset) => (
              <TouchableOpacity
                key={preset.value}
                style={[
                  styles.amountButton,
                  amount === preset.value && styles.selectedAmount,
                ]}
                onPress={() => handleAmountPress(preset.value)}
              >
                <Text
                  style={[
                    styles.amountButtonText,
                    amount === preset.value && styles.selectedAmountText,
                  ]}
                >
                  {preset.display}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Input an Amount (USh)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>USh</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="100"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
            />
          </View>
        </Card>

        {/* Phone Number Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="0776 057 3659"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              maxLength={13} // Including spaces
            />
            <TouchableOpacity onPress={copyToClipboard}>
              <Image
                source={require('../../../assets/copy.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.supportText}>
            All mobile networks are supported
          </Text>
        </View>

        {/* Continue Button */}
        <Button
          title="Continue"
          onPress={handleContinue}
          style={styles.continueButton}
        />

        {/* Saved Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Contact</Text>
            <TouchableOpacity>
              <Text style={styles.recentContact}>Recent Contact</Text>
            </TouchableOpacity>
          </View>
          {savedContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => setPhoneNumber(contact.phoneNumber)}
            >
              <Text style={styles.contactNumber}>{contact.phoneNumber}</Text>
              <Text style={styles.contactName}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#1B1A46',
    marginBottom: 12,
    fontWeight: '500',
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    width: '31%',
    backgroundColor: '#F5F6FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedAmount: {
    backgroundColor: '#0034BB',
  },
  amountButtonText: {
    color: '#1B1A46',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedAmountText: {
    color: '#FFFFFF',
  },
  inputContainer: {
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
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    color: '#1B1A46',
  },
  section: {
    marginBottom: 24,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
  },
  phoneInput: {
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
  supportText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#0034BB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
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
  },
  recentContact: {
    fontSize: 14,
    color: '#0034BB',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactNumber: {
    fontSize: 14,
    color: '#1B1A46',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 12,
    color: '#6B7280',
  },
})
