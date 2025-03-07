import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

export default function Logo({ size = 32, color = "#ffffff" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 180 180" fill="none">
      <G clipPath="url(#a)">
        <G mask="url(#b)">
          <Path
            fill={color}
            d="M135.357 0H44.643C19.987 0 0 19.987 0 44.643v90.714C0 160.013 19.987 180 44.643 180h90.714C160.013 180 180 160.013 180 135.357V44.643C180 19.987 160.013 0 135.357 0Z"
          />
          <Path
            fill="#FFFFFF"
            d="M66.339 38.568 38.575 66.332a6.055 6.055 0 0 0 0 8.564l66.565 66.564a6.054 6.054 0 0 0 8.563 0l27.764-27.764a6.054 6.054 0 0 0 0-8.563L74.902 38.568a6.055 6.055 0 0 0-8.563 0ZM134.041 78.34V47.916a1.926 1.926 0 0 0-1.918-1.918h-30.426c-1.73 0-2.596 2.068-1.354 3.31l30.426 30.425c1.204 1.204 3.31.339 3.31-1.353l-.038-.038ZM45.959 101.697v30.426c0 1.053.865 1.918 1.918 1.918h30.426c1.73 0 2.595-2.068 1.354-3.31l-30.426-30.426c-1.203-1.203-3.31-.338-3.31 1.354l.038.038Z"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#FFFFFF" d="M0 0h180v180H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
