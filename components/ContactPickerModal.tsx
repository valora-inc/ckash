import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import tw from 'twrnc'
import Contacts from 'react-native-contacts'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import BackIcon from '../assets/icons/back-icon.svg'
import SearchIcon from '../assets/icons/search.svg'


interface Contact {
  id: string
  name: string
  phoneNumber: string
  initial: string
}

interface ContactPickerModalProps {
  visible: boolean
  onClose: () => void
  onContactSelect: (phoneNumber: string) => void
}

export const ContactPickerModal: React.FC<ContactPickerModalProps> = ({
  visible,
  onClose,
  onContactSelect,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const requestContactPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message:
              'This app needs access to your contacts to select phone numbers.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } else {
        const result = await request(PERMISSIONS.IOS.CONTACTS)
        return result === RESULTS.GRANTED
      }
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-numeric characters
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '')

    // Get the last 9 digits and prepend with 0
    const last9Digits = cleanedNumber.slice(-9)
    const formattedNumber = '0' + last9Digits

    return formattedNumber
  }

  const loadContacts = async () => {
    try {
      setLoading(true)
      const hasPermission = await requestContactPermission()

      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant contacts permission to select a phone number.',
          [{ text: 'OK' }],
        )
        onClose()
        return
      }

      Contacts.getAll((error: any, contactsData: any[]) => {
        if (error) {
          console.error('Error fetching contacts:', error)
          Alert.alert('Error', 'Failed to load contacts. Please try again.')
          onClose()
          return
        }

        // Filter contacts that have phone numbers and format them
        const formattedContacts: Contact[] = contactsData
          .filter(
            (contact: any) =>
              contact.phoneNumbers && contact.phoneNumbers.length > 0,
          )
          .map((contact: any, index: number) => {
            const name = contact.displayName || contact.givenName || 'Unknown'
            const phoneNumber = contact.phoneNumbers[0].number
            const initial = name.charAt(0).toUpperCase()

            return {
              id: `${index}`,
              name,
              phoneNumber,
              initial,
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name))

        setContacts(formattedContacts)
        setFilteredContacts(formattedContacts)
        setLoading(false)
      })
    } catch (error) {
      console.error('Error loading contacts:', error)
      Alert.alert('Error', 'Failed to load contacts. Please try again.')
      setLoading(false)
      onClose()
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredContacts(contacts)
    } else {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query.toLowerCase()) ||
          contact.phoneNumber.includes(query),
      )
      setFilteredContacts(filtered)
    }
  }

  const handleContactSelect = (contact: Contact) => {
    const formattedNumber = formatPhoneNumber(contact.phoneNumber)
    onContactSelect(formattedNumber)
    onClose()
    setSearchQuery('')
  }

  useEffect(() => {
    if (visible) {
      loadContacts()
    } else {
      setSearchQuery('')
      setContacts([])
      setFilteredContacts([])
    }
  }, [visible])

  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={tw`flex-row items-center py-4 px-4 border-b border-[#EFF3FF]`}
      onPress={() => handleContactSelect(item)}
    >
      <View
        style={tw`w-12 h-12 rounded-full bg-[#EFF3FF] border border-[#AEC5FF] items-center justify-center mr-4`}
      >
        <Text style={tw`text-base font-medium text-[#1B1A46]`}>
          {item.initial}
        </Text>
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-medium text-[#1B1A46] `}>
          {item.name}
        </Text>
        <Text style={tw`text-sm text-[#666]`}>{item.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 bg-[#F5F7FA]`}>
        {/* Header */}
        <View
          style={tw`flex-row items-center justify-between px-4 py-4 bg-white border-b border-[#EFF3FF]`}
        >
          <TouchableOpacity onPress={onClose} style={tw`p-2`}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold text-[#1B1A46]`}>
            Select Contact
          </Text>
          <View style={tw`w-8`} />
        </View>

        {/* Search Bar */}
        <View style={tw`px-4 py-4 bg-white border-b border-[#EFF3FF]`}>
          <View
            style={tw`flex-row items-center bg-[#DAE3FF] border border-[#B2C7FF] rounded-lg px-3 py-3`}
          >
            <SearchIcon width={20} height={20} style={tw`text-[#666] mr-3`} />
            <TextInput
              style={tw`flex-1 text-base text-[#1B1A46]`}
              placeholder="Search contact..."
              placeholderTextColor="#A0A0A0"
              value={searchQuery}
              onChangeText={handleSearch}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Contact List */}
        {loading ? (
          <View style={tw`flex-1 items-center justify-center bg-white`}>
            <Text style={tw`text-[#666]`}>Loading contacts...</Text>
          </View>
        ) : (
          <View style={tw`flex-1 bg-white`}>
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={renderContactItem}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1`}
              ListEmptyComponent={
                <View style={tw`flex-1 items-center justify-center py-20`}>
                  <Text style={tw`text-[#666] text-base`}>
                    {searchQuery
                      ? 'No contacts found'
                      : 'No contacts available'}
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </Modal>
  )
}
