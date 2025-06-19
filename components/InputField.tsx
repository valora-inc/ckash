import * as React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import tw from 'twrnc'

interface InputFieldProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: any
  inputStyle?: any
  onIconPress?: () => void
}

export default function InputField({
  icon,
  containerStyle,
  inputStyle,
  onIconPress,
  ...props
}: InputFieldProps) {
  const IconComponent = onIconPress ? TouchableOpacity : View

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
      {icon && (
        <IconComponent onPress={onIconPress} style={tw`pr-4`}>
          {icon}
        </IconComponent>
      )}
    </View>
  )
}
