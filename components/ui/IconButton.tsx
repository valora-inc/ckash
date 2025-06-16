import React from 'react'
import {
  Pressable,
  Text,
  ViewStyle,
} from 'react-native'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type IconButtonProps = {
  iconName: string
  iconSize?: number
  iconColor?: string
  iconRotate?: string
  lable: string
  onPress: () => void
  disabled?: boolean
  style?: ViewStyle

  textStyle?: object
  iconPostion: 'left' | 'right'
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 20,
  onPress,
  disabled = false,
  style,
  textStyle,
  iconColor,
  lable,
  iconRotate,
  iconPostion = 'left',
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        tw`flex-row items-center justify-center gap-1 px-2 py-2 bg-[#D3DFFE] rounded-[2px] flex-1`,
        pressed && tw`opacity-70`,
        disabled && tw`opacity-40`,
        style,
      ]}
    >
      {iconPostion === 'left' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
      {lable && (
        <Text style={[tw`text-xs font-medium text-[#1B1A46]`, textStyle]}>
          {lable}
        </Text>
      )}
      {iconPostion === 'right' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
    </Pressable>
  )
}

export default IconButton
