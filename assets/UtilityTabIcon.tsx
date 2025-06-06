import * as React from 'react'
import Svg, { Rect, Path, Line } from 'react-native-svg'

interface Props {
  color?: string
  size?: number
  testID?: string
}

const UtilityIcon = ({ color = 'black', size = 30, testID }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    testID={testID}
  >
    {/* Rectangle for the bill */}
    <Rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
    {/* Dollar sign - S with vertical line */}
    <Path d="M12 10c-1 0-1 1-1 1s0 1 1 1 1 1 1 1-1 1-1 1" />
    <Line x1="12" y1="8" x2="12" y2="16" />
  </Svg>
)

export default UtilityIcon
