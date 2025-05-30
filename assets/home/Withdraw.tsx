import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
const Withdraw = () => (
  <Svg width={48} height={48} fill="none">
    <Path
      fill="url(#a)"
      d="M36 36c6.627-6.627 6.627-17.372 0-24-6.628-6.627-17.373-6.627-24 0-6.628 6.628-6.628 17.373 0 24 6.627 6.627 17.372 6.627 24 0Z"
    />
    <Path
      fill="url(#b)"
      d="M24 38c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14Z"
    />
    <Path
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={1.13}
      d="M33.466 33.467c5.229-5.228 5.229-13.706 0-18.935-5.229-5.228-13.706-5.228-18.935 0-5.229 5.23-5.229 13.707 0 18.935 5.229 5.23 13.706 5.23 18.935 0Z"
    />
    <Path
      fill="#fff"
      d="M18.75 18.5h13.5v9h-13.5v-9Zm6.75 2.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM21.75 20a1.5 1.5 0 0 1-1.5 1.5v3a1.5 1.5 0 0 1 1.5 1.5h7.5a1.5 1.5 0 0 1 1.5-1.5v-3a1.5 1.5 0 0 1-1.5-1.5h-7.5Zm-6 1.5h1.5V29h12v1.5h-13.5v-9Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={7.029}
        x2={40.971}
        y1={24}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={10}
        x2={38}
        y1={24}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default Withdraw
