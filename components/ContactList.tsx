import * as React from 'react'
import tw from 'twrnc'
import { View, Text, TouchableOpacity } from 'react-native'
import SearchIcon from '../assets/icons/search.svg'

export interface Contact {
  phone: string
  name: string
}

interface ContactListProps {
  contacts: Contact[]
  activeTab: 'saved' | 'recent'
  onTabChange: (tab: 'saved' | 'recent') => void
  onContactSelect: (contact: Contact) => void
}

export default function ContactList({
  contacts,
  activeTab,
  onTabChange,
  onContactSelect,
}: ContactListProps) {
  return (
    <View style={tw`bg-[#EFF3FF] border border-[#AEC5FF] rounded-lg p-6 mb-4`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <TouchableOpacity
          style={[tw`p-2`, activeTab === 'saved' && tw`mb-1`]}
          onPress={() => onTabChange('saved')}
        >
          <Text
            style={[
              tw`text-sm text-gray-900`,
              activeTab === 'saved' && tw`text-black font-semibold`,
            ]}
          >
            Saved Contact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`p-2`, activeTab === 'recent' && tw`text-black`]}
          onPress={() => onTabChange('recent')}
        >
          <Text
            style={[
              tw`text-sm text-gray-900`,
              activeTab === 'recent' && tw`text-black font-semibold`,
            ]}
          >
            Recent Contact
          </Text>
        </TouchableOpacity>
        <SearchIcon width={22} height={22} />
      </View>

      {/* Contact List */}
      <View style={tw`flex flex-col gap-2`}>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center justify-between p-4 bg-[#DAE3FF] rounded`}
            onPress={() => onContactSelect(contact)}
          >
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-sm font-medium text-sm text-black`}>
                {contact.phone}
              </Text>
              <Text style={tw`text-sm font-medium text-base text-gray-400`}>
                {contact.name}
              </Text>
            </View>
            <View
              style={tw`w-10 h-10 bg-[#2B5CE6] rounded-full items-center justify-center`}
            >
              <Text style={tw`text-white text-sm font-medium`}>M</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
