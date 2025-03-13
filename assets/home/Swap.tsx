import * as React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
const Swap = () => (
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
      d="M27.517 28.638v-6.49h-1.852v6.49h-2.777l3.703 3.695 3.704-3.695h-2.778Zm-6.481-12.972-3.704 3.694h2.778v6.491h1.852v-6.49h2.777l-3.703-3.695Z"
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
);
export default Swap;
