import * as React from 'react'
import { View, TextInput, TextInputProps } from 'react-native'
import tw from 'twrnc'

interface InputFieldProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: any
  inputStyle?: any
}

export default function InputField({
  icon,
  containerStyle,
  inputStyle,
  ...props
}: InputFieldProps) {
  return (
    <View
      style={[
        tw`flex-row items-center bg-white border border-[#DAE3FF] rounded py-2 mb-2 bg-[#DAE3FF]`,
        containerStyle,
      ]}
    >
      <TextInput
        style={[tw`flex-1 font-size-10 pl-5 text-[#333]`, inputStyle]}
        placeholderTextColor="#A0A0A0"
        {...props}
      />
      {icon && icon}
    </View>
  )
}
