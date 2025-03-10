import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  size?: number
  style?: ViewStyle
}

export default function Logo({ style, size = 24 }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill="#477BFF"
          d="m24 11.984-7.534 4.333-5.821-3.14c.127-.371.206-.758.206-1.177 0-.418-.079-.837-.222-1.224l5.393-3.093L24 11.984Z"
        />
        <Path
          fill="#003CD6"
          d="M11.912 24c-3.458 0-6.244-1.13-8.52-3.455C1.11 18.225 0 15.432 0 11.999c0-3.432 1.109-6.241 3.39-8.557C5.67 1.125 8.456 0 11.911 0c2.241 0 4.218.52 6.042 1.589 1.324.781 2.41 1.74 3.289 2.906l-4.52 2.643-.047-.05c-1.219-1.305-2.837-1.967-4.812-1.967-1.845 0-3.42.66-4.684 1.963-1.246 1.267-1.882 2.923-1.882 4.915 0 1.993.633 3.625 1.882 4.915 1.253 1.292 2.828 1.948 4.684 1.948 1.503 0 2.795-.374 3.84-1.11a5.09 5.09 0 0 0 1.06-.931l4.493 2.638c-.88 1.193-1.972 2.167-3.307 2.954C16.11 23.479 14.13 24 11.912 24Z"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: 'rgba(46, 51, 56, 0.15)',
  },
})
