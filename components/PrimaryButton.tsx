import * as React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import tw from 'twrnc'

interface PrimaryButtonProps {
  onPress: () => void
  label: string
  style?: any
  textStyle?: any
}

export default function PrimaryButton({
  onPress,
  label,
  style,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[tw`bg-[#2B5CE6] rounded-lg p-4 mb-4`, style]}
      onPress={onPress}
    >
      <Text
        style={[tw`text-white text-center font-semibold text-lg`, textStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
