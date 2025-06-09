import React from 'react'
import {
  Pressable,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native'
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
  iconSize = 15,
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
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {iconPostion === 'left' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
      {lable && <Text style={[styles.text, textStyle]}>{lable}</Text>}
      {iconPostion === 'right' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#D3DFFE',
    borderRadius: 4,
    width: 102,
    height: 40,
  },
  iconContainer: {
    marginBottom: 6,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    zIndex: 1000,
    padding: 6,
    color: '#000',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
})

export default IconButton
