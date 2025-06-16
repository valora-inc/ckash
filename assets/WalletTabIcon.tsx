import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  color?: string
  size?: number
  testID?: string
}

const WalletIcon = ({ color = 'black', size=30 , testID }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    testID={testID}
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M21 7H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
    <Path d="M21 7v10" />
    <Path d="M16 11a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
  </Svg>
)

export default WalletIcon
