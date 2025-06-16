import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import tw from 'twrnc'
import CustomDropdown from './CustomDropdown'

const DropdownDemo = () => {
  const [basicValue, setBasicValue] = useState('option1')
  const [modernValue, setModernValue] = useState('kenya')
  const [darkValue, setDarkValue] = useState('plan1')

  const basicItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  const countryItems = [
    { label: '🇰🇪 Kenya', value: 'kenya', icon: '🇰🇪' },
    { label: '🇺🇬 Uganda', value: 'uganda', icon: '🇺🇬' },
    { label: '🇬🇭 Ghana', value: 'ghana', icon: '🇬🇭' },
    { label: '🇳🇬 Nigeria', value: 'nigeria', icon: '🇳🇬' },
  ]

  const planItems = [
    { label: 'Basic Plan - $9/month', value: 'plan1' },
    { label: 'Pro Plan - $19/month', value: 'plan2' },
    { label: 'Enterprise Plan - $49/month', value: 'plan3' },
  ]

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-6`}>
        Custom Dropdown Examples
      </Text>

      {/* Basic Example */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-3`}>
          Basic Dropdown
        </Text>
        <CustomDropdown
          items={basicItems}
          selectedValue={basicValue}
          onSelect={setBasicValue}
          placeholder="Choose an option"
          dropdownStyle="h-12 bg-white border border-gray-300 rounded-lg px-4 flex-row items-center justify-between"
          textStyle="text-base text-gray-700"
          placeholderStyle="text-base text-gray-400"
          dropdownListStyle="bg-white rounded-lg shadow-lg border border-gray-200"
          itemStyle="px-4 py-3 border-b border-gray-100"
          selectedItemStyle="bg-blue-50 border-blue-200"
          itemTextStyle="text-base text-gray-700"
          selectedItemTextStyle="text-base text-blue-600 font-medium"
          arrowStyle="text-gray-500"
        />
      </View>

      {/* Modern Example with Icons */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-3`}>
          Modern Dropdown with Icons
        </Text>
        <CustomDropdown
          items={countryItems}
          selectedValue={modernValue}
          onSelect={setModernValue}
          placeholder="Select Country"
          dropdownStyle="h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl px-4 flex-row items-center justify-between shadow-lg"
          textStyle="text-white font-medium text-base"
          placeholderStyle="text-white/70 text-base"
          dropdownListStyle="bg-white rounded-xl shadow-2xl border-0"
          itemStyle="px-4 py-4 border-b border-gray-50"
          selectedItemStyle="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
          itemTextStyle="text-gray-700 text-base"
          selectedItemTextStyle="text-blue-600 font-semibold text-base"
          arrowStyle="text-white text-lg"
          animationDuration={300}
        />
      </View>

      {/* Dark Theme Example */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-3`}>
          Dark Theme Dropdown
        </Text>
        <CustomDropdown
          items={planItems}
          selectedValue={darkValue}
          onSelect={setDarkValue}
          placeholder="Choose your plan"
          dropdownStyle="h-12 bg-gray-800 border border-gray-600 rounded-lg px-4 flex-row items-center justify-between"
          textStyle="text-white text-sm font-medium"
          placeholderStyle="text-gray-400 text-sm"
          dropdownListStyle="bg-gray-800 rounded-lg shadow-xl border border-gray-600"
          itemStyle="px-4 py-3 border-b border-gray-700"
          selectedItemStyle="bg-gray-700 border-gray-500"
          itemTextStyle="text-gray-200 text-sm"
          selectedItemTextStyle="text-green-400 font-semibold text-sm"
          arrowStyle="text-gray-400"
        />
      </View>

      {/* Compact Example */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-3`}>
          Compact Dropdown (Like Original)
        </Text>
        <View style={tw`flex-row justify-end`}>
          <CustomDropdown
            items={countryItems}
            selectedValue={modernValue}
            onSelect={setModernValue}
            dropdownStyle="h-6 w-32 bg-[#8DADFE] rounded px-2 flex-row items-center justify-between"
            textStyle="text-xs text-black font-normal"
            dropdownListStyle="bg-[#8DADFE] rounded-md shadow-xl"
            itemStyle="px-3 py-2 border-b border-[#7A96FE]/30"
            selectedItemStyle="bg-[#6B8BFE]"
            itemTextStyle="text-xs text-black"
            selectedItemTextStyle="text-xs text-white font-medium"
            arrowStyle="text-xs text-black/70"
            maxHeight={120}
          />
        </View>
      </View>

      {/* Disabled Example */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-3`}>
          Disabled Dropdown
        </Text>
        <CustomDropdown
          items={basicItems}
          selectedValue={basicValue}
          onSelect={setBasicValue}
          disabled={true}
          placeholder="This is disabled"
          dropdownStyle="h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 flex-row items-center justify-between"
          textStyle="text-base text-gray-500"
          arrowStyle="text-gray-400"
        />
      </View>
    </ScrollView>
  )
}

export default DropdownDemo
