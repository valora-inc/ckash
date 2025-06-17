import * as React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { RootStackScreenProps } from './types'
import { navigate } from '@divvi/mobile'
import Card from '../components/ui/Card'
import { useTokens } from '../utils'
import SimpleDropdown from '../components/ui/SimpleDropdown'

// import SearchIcon from '../assets/icons/search.svg'

import IconButton from '../components/ui/IconButton'
import tw from 'twrnc'
import { services } from '../constants'
import { calculateTotalUsdValue } from '../lib/cKash'
import ServiceButton from '../components/ServiceButton'


const Promotions = [
  {
    name: 'Partnership',
    logoOne: '../assets/ckashxmento.png',

    externalLink: '/https',
  },
  {
    name: 'Partnership',
    logoOne: '../assets/ckashxmento.png',

    externalLink: '/https',
  },
  {
    name: 'Partnership',
    logoOne: '../assets/ckashxmento.png',

    externalLink: '/https',
  },
]

export default function WalletScreen(
  _props: RootStackScreenProps<'CustomWallet'>,
) {
  const [usdBalance, setUsdBalance] = React.useState<number>(0.0)
  const [selectedCountry, setSelectedCountry] = React.useState('Kenya')
  const [balanceHidden, setBalanceHidden] = React.useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  // Dropdown state
  const [dropdownItems] = React.useState([
    { label: '🇰🇪 Kenya', value: 'Kenya' },
    { label: '🇺🇬 Uganda', value: 'Uganda' },
    { label: '🇬🇭 Ghana', value: 'Ghana' },
    { label: '🇳🇬 Nigeria', value: 'Nigeria' },
  ])

  const { tokens, cKESToken, cUSDToken } = useTokens()
  const currentPromo = Promotions[currentIndex]

  function onPressHoldUSD() {
    !!cKESToken &&
      !!cUSDToken &&
      navigate('Swap', {
        fromTokenId: cKESToken.tokenId,
        toTokenId: cUSDToken.tokenId,
      })
  }
  function onPressSendMoney() {
    navigate('Send')
  }

  function onPressRecieveMoney() {
    navigate('Receive')
  }
  // const FeatherIcon = Feather as any;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Promotions.length)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleCountrySelect = (value: string) => {
    setSelectedCountry(value)
  }

  React.useEffect(() => {
    if (!tokens || tokens.length === 0) return
    setUsdBalance(calculateTotalUsdValue(tokens))
  }, [tokens])

  return (
    <View style={tw`flex-1 pt-0 gap-4 items-center`}>
      <View
        style={tw`flex-5 bg-[#D7E1FF] pb-8 w-[100%] justify-center items-center`}
      >
        <View style={tw`flex-4 pt-2 w-[100%] justify-center items-center`}>
          <Card
            style={tw` flex-1 bg-[#0034BB] rounded-lg w-[90%] h-[95%] gap-4 my-4 mx-2.5 justify-between z-10`}
          >
            {/* Wallet Title */}
            <View style={tw`flex-row gap-4 pt-2`}>
              <Text style={{ color: '#AEC5FF' }}>Wallet Balance</Text>
              <TouchableOpacity
                onPress={() => setBalanceHidden(!balanceHidden)}
              ></TouchableOpacity>
            </View>

            {/* Wallet Balance */}
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-row gap-1`}>
                <Text style={tw`text-3xl font-medium text-[#AEC5FF]`}>$</Text>
                <Text style={tw`text-4xl font-semibold text-[#E4EBFE]`}>
                  {balanceHidden ? '*****' : usdBalance}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: '40%',
                  zIndex: 1000,
                }}
              >
                <SimpleDropdown
                  items={dropdownItems}
                  selectedValue={selectedCountry}
                  onSelect={handleCountrySelect}
                  dropdownStyle="h-6 w-22 border-transparent bg-[#8DADFE] ml-11 rounded-[2px] flex-row items-center justify-between px-2"
                  textStyle="text-xs text-black flex-1 font-normal"
                  dropdownListStyle="bg-[#8DADFE] rounded-md rounded-[2px] border border-[#7A96FE]"
                  itemStyle="px-2 py-2.5 border-b border-[#7A96FE]/30"
                  selectedItemStyle="bg-[#6B8BFE] px-2 py-2.5 border-[#5A7BFE]"
                  itemTextStyle="text-xs text-black font-normal"
                  selectedItemTextStyle="text-xs text-white font-medium"
                  maxHeight={160}
                />
              </View>
            </View>

            {/* Buttons */}
            <View
              style={tw`flex-row justify-between items-center gap-1.5 mb-2 mx-1`}
            >
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-xs text-[#1B1A46]`}
                iconName="send"
                iconPostion="left"
                lable="Send"
                onPress={onPressSendMoney}
              />
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-xs text-[#1B1A46]`}
                iconName="arrow-down"
                iconPostion="left"
                lable="Receive"
                onPress={onPressRecieveMoney}
              />
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-xs text-[#1B1A46]`}
                iconName="swap-horizontal"
                iconPostion="left"
                lable="Swap"
                onPress={onPressHoldUSD}
              />
            </View>
          </Card>
        </View>

        {/* Services */}
        <View style={tw`flex-1.5 w-[90%] bg-transparent justify-center pb-4`}>
          <View style={tw`flex flex-col justify-start pt-2 pb-2`}>
            <Text
              style={tw`pt-6 pb-2 text-left self-start font-medium text-base text-[#1B1A46]`}
            >
              Quick Utilities
            </Text>
            <View style={tw`flex-row flex-wrap gap-1.5`}>
              {services[selectedCountry].map((item) => (
                <ServiceButton
                  key={item.name}
                  name={item.name}
                  navigate={item.navigate}
                  icon={item.icon}
                />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Promotion */}
      <View
        style={tw`flex-1.8 w-[100%]  bg-transparent justify-center items-center`}
      >
        <View style={tw`w-full bg-transparent h-[90%] p-0 m-0 shadow-none`}>
          <TouchableOpacity
            style={tw`justify-center items-center`}
            onPress={() => Linking.openURL(currentPromo.externalLink)}
          >
            <Image
              resizeMode="cover"
              source={require('../assets/ckashxmento.png')}
              style={tw`w-[90%] h-[100%] rounded-xl`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tokens */}
      <View style={tw`flex-4 w-[100%] px-4`}>
        <View style={tw`px-2  pb-2`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`font-medium text-base text-[#1B1A46]`}>
              My Assets
            </Text>
            {/* <SearchIcon width={22} height={22} /> */}
          </View>

          <FlatList
            data={tokens}
            keyExtractor={(item) => item.tokenId}
            contentContainerStyle={tw`pb-4`}
            renderItem={({ item }) => (
              <View
                style={tw`flex-row items-center bg-white rounded-lg  py-1 mb-2 overflow-y-hidden`}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={tw`w-12 h-12 mr-3 rounded-full`}
                  resizeMode="contain"
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`font-bold text-sm text-[#0034BB]`}>
                    {item.symbol}
                  </Text>
                  <Text style={tw`text-xs text-gray-500`}>{item.name}</Text>
                </View>
                <View style={tw`items-end`}>
                  <Text style={tw`font-bold text-base text-[#0034BB]`}>
                    {Number(item.balance).toFixed(4)}
                  </Text>
                  <Text style={tw`text-xs text-gray-500`}>
                    $
                    {(
                      Number(item.balance) * Number(item.lastKnownPriceUsd)
                    ).toFixed(4)}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}
