import * as React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import tw from 'twrnc'

interface PrimaryButtonProps {
  onPress: () => void
  label: string 
  style?: any
  textStyle?: any
  isLoading?:boolean
}

export default function PrimaryButton({
  onPress,
  label,
  style,
  textStyle,
  isLoading
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[tw`bg-[#2B5CE6] rounded-lg p-4 mb-4`, style]}
      onPress={onPress}
    >
      {isLoading ? (
        <View style={tw`flex-row items-center justify-center`}>
        <ActivityIndicator size="small" color="#fff" style={tw`mr-2`} />
        <Text style={[tw`text-white font-semibold text-lg`, textStyle]}>
          Processing...
        </Text>
      </View>
      ) : (
        <Text style={[tw`text-white text-center font-semibold text-lg`, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}
