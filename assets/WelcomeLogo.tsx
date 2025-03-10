import * as React from 'react'
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Stop,
} from 'react-native-svg'
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={204}
    height={184}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={204}
        height={184}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path fill="#fff" d="M204 0H0v184h204V0Z" />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="url(#c)"
          d="M41.24 163.375c-3.608-3.289-11.274-3.797-19.03-.874-7.854 2.96-13.313 8.504-13.718 13.399l-.605.233 1.068 2.823.012-.004c2.224 5.212 11.375 6.624 20.652 3.127 9.277-3.496 15.209-10.594 13.428-15.973l.012-.003-1.131-2.989-.684.263-.004-.002Z"
        />
        <Path
          fill="url(#d)"
          d="M41.987 163.28c2.045 5.405-3.932 12.666-13.348 16.215-9.416 3.549-18.708 2.043-20.753-3.362-2.046-5.405 3.93-12.666 13.347-16.215 9.416-3.549 18.708-2.043 20.754 3.362Z"
        />
        <Path
          fill="url(#e)"
          d="M38.369 164.294c1.624 4.296-3.124 10.064-10.605 12.884-7.482 2.82-14.865 1.623-16.49-2.672-1.625-4.295 3.123-10.064 10.605-12.883 7.483-2.82 14.865-1.624 16.49 2.671Z"
        />
        <Path
          fill="#fff"
          d="M27.526 176.554c-7.124 2.685-14.136 1.661-15.627-2.284-1.492-3.944 3.092-9.338 10.216-12.023 7.126-2.684 14.136-1.661 15.63 2.282 1.491 3.945-3.092 9.338-10.217 12.023l-.002.002Zm-5.381-14.224c-7.08 2.668-11.638 8.011-10.164 11.909 1.475 3.897 8.434 4.898 15.513 2.231 7.08-2.668 11.64-8.011 10.164-11.909-1.474-3.898-8.434-4.899-15.513-2.231Z"
        />
        <Path
          fill="url(#f)"
          d="M200.974 124.98c2.077-4.096.601-11.164-4.014-17.446-4.675-6.363-11.09-9.903-15.641-9.035l-.362-.49-2.296 1.68.006.01c-4.174 3.33-3.146 11.97 2.376 19.486 5.52 7.516 13.468 11.092 17.906 8.12l.006.009 2.428-1.777-.411-.553.002-.004Z"
        />
        <Path
          fill="url(#g)"
          d="M201.251 125.642c4.395-3.217 3.416-12.008-2.188-19.636-5.603-7.627-13.709-11.203-18.104-7.986-4.396 3.216-3.416 12.007 2.187 19.635 5.604 7.628 13.709 11.204 18.105 7.987Z"
        />
        <Path
          fill="url(#h)"
          d="M199.416 122.62c3.492-2.556 2.714-9.542-1.738-15.603-4.453-6.061-10.894-8.903-14.387-6.346-3.493 2.556-2.715 9.541 1.738 15.603 4.453 6.061 10.894 8.902 14.387 6.346Z"
        />
        <Path
          fill="#fff"
          d="M185.535 115.895c-4.24-5.772-5.081-12.377-1.875-14.724 3.206-2.348 9.266.438 13.505 6.211 4.242 5.772 5.081 12.377 1.875 14.724-3.206 2.347-9.266-.438-13.507-6.211h.002Zm11.565-8.465c-4.213-5.734-10.22-8.513-13.389-6.192-3.171 2.319-2.322 8.873 1.891 14.606 4.213 5.735 10.22 8.514 13.389 6.193 3.169-2.319 2.32-8.872-1.893-14.607h.002Z"
        />
        <Path
          fill="url(#i)"
          d="m156.91 18.286 11.548-2.454 8.975 8.541-12.322 3.026-8.201-9.113Z"
        />
        <Path
          fill="url(#j)"
          d="M173.038 0 156.91 18.287l8.201 9.113L173.038 0Z"
          opacity={0.7}
        />
        <Path
          fill="url(#k)"
          d="m173.038 0-7.927 27.4 12.322-3.026L173.038 0Z"
          opacity={0.7}
        />
        <Path
          fill="url(#l)"
          d="m156.91 18.287 5.776 17.503 2.425-8.39-8.201-9.113Z"
        />
        <Path
          fill="url(#m)"
          d="m162.686 35.789 14.746-11.416-12.322 3.026-2.424 8.39Z"
        />
        <Path
          fill="#fff"
          d="m177.418 24.288-12.279 3.014-8.172-9.081-.057.065 8.201 9.114-2.425 8.39.135-.108 2.39-8.252 12.222-3.056-.015-.086Z"
          opacity={0.5}
        />
        <Path
          fill="url(#n)"
          d="m.787 95.427 7.86-11.195 14.387.173-8.065 12.29L.787 95.426Z"
        />
        <Path
          fill="url(#o)"
          d="m0 67.176.787 28.25 14.181 1.268L0 67.176Z"
          opacity={0.7}
        />
        <Path
          fill="url(#p)"
          d="m0 67.176 14.968 29.518 8.066-12.289L0 67.175Z"
          opacity={0.7}
        />
        <Path
          fill="url(#q)"
          d="m.787 95.428 18.765 10.304-4.583-9.037L.787 95.428Z"
        />
        <Path
          fill="url(#r)"
          d="m19.552 105.73 3.482-21.326-8.065 12.29 4.583 9.036Z"
        />
        <Path
          fill="#fff"
          d="M22.951 84.344 14.916 96.59.783 95.326l.004.101 14.181 1.268 4.584 9.036.031-.197-4.51-8.892 7.96-12.236-.082-.062Z"
          opacity={0.5}
        />
        <Path
          fill="url(#s)"
          d="M161.258 127.674c0 23.405-19.007 42.376-42.454 42.376-19.056 0-35.182-12.531-40.552-29.79a42.213 42.213 0 0 1-1.904-12.586c0-23.402 19.008-42.373 42.456-42.373 1.944 0 3.858.131 5.734.384 20.735 2.793 36.722 20.527 36.722 41.989h-.002Z"
        />
        <Path
          fill="url(#t)"
          d="M118.803 163.219c19.666 0 35.609-15.913 35.609-35.542 0-19.63-15.943-35.542-35.609-35.542-19.667 0-35.61 15.912-35.61 35.542 0 19.629 15.943 35.542 35.61 35.542Z"
        />
        <Path
          stroke="#fff"
          strokeMiterlimit={10}
          strokeWidth={1.13}
          d="M142.485 151.317c13.08-13.056 13.08-34.223 0-47.279-13.08-13.055-34.288-13.055-47.368 0-13.08 13.056-13.08 34.223 0 47.279 13.08 13.056 34.288 13.056 47.368 0Z"
        />
        <Path
          fill="#fff"
          d="M118.894 148c6.923 0 12.786-4.476 14.976-10.657h-4.309c-1.908 3.978-6.005 6.678-10.667 6.678-6.569 0-11.938-5.399-11.938-12.007 0-4.689 2.684-8.81 6.64-10.728v-4.334C107.45 119.154 103 125.051 103 132.014c0 8.81 7.135 15.986 15.894 15.986Zm9.113-19.538v-5.826c1.978.497 3.532 1.137 3.532 2.842 0 1.563-1.343 2.7-3.532 2.984Zm-2.685 5.399h2.826v-2.202c4.168-.497 6.852-2.913 6.852-6.181 0-4.547-3.603-5.542-6.993-6.181v-6.039c1.624.142 3.39.639 5.015 1.42v-3.552a16.585 16.585 0 0 0-4.874-.995V108h-2.826v2.131c-4.309.498-6.781 2.913-6.781 5.968 0 4.619 3.532 5.684 6.923 6.324v6.039c-2.049-.284-4.239-1.137-6.782-2.487v3.766c2.19 1.065 4.45 1.776 6.64 1.918v2.202Zm.142-14.849c-1.978-.426-3.462-1.136-3.462-2.913 0-1.634 1.272-2.628 3.462-2.841v5.754Z"
        />
        <Path
          fill="#000"
          d="M126.443 98.269c0 23.402-19.009 42.375-42.456 42.375-1.944 0-3.858-.131-5.735-.384a42.213 42.213 0 0 1-1.904-12.586c0-23.402 19.008-42.373 42.456-42.373 1.944 0 3.858.131 5.734.384a42.179 42.179 0 0 1 1.905 12.584Z"
          opacity={0.4}
        />
        <Path
          fill="url(#u)"
          d="M111.275 125.996c16.579-16.548 16.579-43.378 0-59.926-16.58-16.548-43.46-16.548-60.04 0-16.579 16.548-16.579 43.378 0 59.926 16.58 16.548 43.46 16.548 60.04 0Z"
        />
        <Path
          fill="url(#v)"
          d="M81.254 131.574c19.666 0 35.609-15.912 35.609-35.542 0-19.63-15.943-35.542-35.609-35.542-19.667 0-35.61 15.913-35.61 35.542 0 19.63 15.943 35.542 35.61 35.542Z"
        />
        <Path
          stroke="#fff"
          strokeMiterlimit={10}
          strokeWidth={1.13}
          d="M104.936 119.673c13.081-13.056 13.081-34.223 0-47.279-13.08-13.055-34.288-13.055-47.368 0-13.08 13.056-13.08 34.223 0 47.279 13.08 13.055 34.288 13.055 47.368 0Z"
        />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M73.174 82.863C66.67 85.096 62 91.246 62 98.483c0 9.123 7.421 16.518 16.576 16.518a16.58 16.58 0 0 0 15.621-10.978H89.27a12.053 12.053 0 0 1-10.693 6.467c-6.654 0-12.049-5.376-12.049-12.007 0-4.695 2.705-8.76 6.647-10.734v-4.886Z"
          clipRule="evenodd"
        />
        <Path
          fill="#fff"
          d="M83.24 75h-5.144v24.987h5.143v-8.433l1.83-1.823 6.6 10.256h4.091l-8.296-12.643 1.485-1.48 8.96 14.123H102L91.344 83.478 99.852 75H92.58l-9.34 9.306V75Z"
        />
        <Path
          fill="url(#w)"
          d="m113.471 53.157 6.897 15.083 2.742-5.29s16.772 4.53 24.815 23.505l7.356-6.173s-9.14-19.339-28.515-25.542l2.558-5.11-15.853 3.527Z"
        />
        <Path
          fill="url(#x)"
          d="m80.468 169.609-4.74-15.889-3.448 4.861s-15.98-6.805-21.315-26.708l-8.14 5.098s6.369 20.414 24.695 29.235l-3.242 4.706 16.192-1.303h-.002Z"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="c"
        x1={8.869}
        x2={42.955}
        y1={178.719}
        y2={165.822}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8CA5E7" />
        <Stop offset={1} stopColor="#4369E9" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={7.892}
        x2={41.977}
        y1={176.135}
        y2={163.237}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={11.278}
        x2={38.361}
        y1={174.51}
        y2={164.262}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={178.873}
        x2={199.116}
        y1={99.538}
        y2={127.199}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8CA5E7" />
        <Stop offset={1} stopColor="#4369E9" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={180.962}
        x2={201.205}
        y1={97.999}
        y2={125.659}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={183.295}
        x2={199.38}
        y1={100.654}
        y2={122.633}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={156.761}
        x2={177.322}
        y1={18.735}
        y2={24.681}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="j"
        x1={159.05}
        x2={169.052}
        y1={10.819}
        y2={13.712}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={169.053}
        x2={179.615}
        y1={13.701}
        y2={16.755}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={154.776}
        x2={164.776}
        y1={25.599}
        y2={28.491}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="m"
        x1={164.756}
        x2={175.317}
        y1={28.559}
        y2={31.613}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="n"
        x1={1.059}
        x2={23.201}
        y1={95.904}
        y2={84.674}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={-3.267}
        x2={7.504}
        y1={87.377}
        y2={81.915}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={7.512}
        x2={18.884}
        y1={81.931}
        y2={76.163}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={4.808}
        x2={15.579}
        y1={103.299}
        y2={97.836}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={15.63}
        x2={27.003}
        y1={97.939}
        y2={92.17}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={76.346}
        x2={161.258}
        y1={127.676}
        y2={127.676}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={83.193}
        x2={154.412}
        y1={127.677}
        y2={127.677}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="u"
        x1={38.8}
        x2={123.71}
        y1={96.032}
        y2={96.032}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="v"
        x1={45.645}
        x2={116.863}
        y1={96.032}
        y2={96.032}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4870FA" />
        <Stop offset={1} stopColor="#96B3F9" />
      </LinearGradient>
      <LinearGradient
        id="w"
        x1={113.471}
        x2={155.281}
        y1={68.041}
        y2={68.041}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <LinearGradient
        id="x"
        x1={82.572}
        x2={41.17}
        y1={154.967}
        y2={149.167}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#96B3F9" />
        <Stop offset={1} stopColor="#4870FA" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h204v184H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
