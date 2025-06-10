import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { RootStackScreenProps } from './types'
import { navigate } from '@divvi/mobile'
import Card from '../components/ui/Card'
import { useTokens } from '../utils'
import DropDownPicker from 'react-native-dropdown-picker'

import SearchIcon from '../assets/icons/search.svg'

import IconButton from '../components/ui/IconButton'
import tw from 'twrnc'
import { services } from '../constants'
import { calculateTotalUsdValue } from '../lib/cKash'

const Token = [
  {
    address: '0x765de816845861e75a25fca122bb6898b8b1282a',
    balance: '40',
    canTransferWithComment: true,
    decimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cUSD.png',
    infoUrl: 'https://www.coingecko.com/en/coins/celo-dollar',
    isCashInEligible: true,
    isCashOutEligible: true,
    isCoreToken: true,
    isFeeCurrency: true,
    isStableCoin: true,
    isSupercharged: true,
    isSwappable: true,
    lastKnownPriceUsd: '0.999171',
    name: 'Celo Dollar',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'cUSD',
    tokenId: 'celo-mainnet:0x765de816845861e75a25fca122bb6898b8b1282a',
  },
  {
    address: '0xceba9300f2b948710d2653dd7b07f33a8b32118c',
    balance: '120',
    decimals: 6,
    feeCurrencyAdapterAddress: '0x2f25deb3848c207fc8e0c34035b3ba7fc157602b',
    feeCurrencyAdapterDecimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/USDC.png',
    infoUrl: 'https://www.coingecko.com/en/coins/usdc',
    isCashInEligible: true,
    isStableCoin: true,
    lastKnownPriceUsd: '0.999793',
    minimumAppVersionToSwap: '0.0.0',
    name: 'USDC',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'USDC',
    tokenId: 'celo-mainnet:0xceba9300f2b948710d2653dd7b07f33a8b32118c',
  },
  {
    address: '0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e',
    balance: '100000',
    decimals: 6,
    feeCurrencyAdapterAddress: '0x0e2a3e05bc9a16f5292a6170456a710cb89c6f72',
    feeCurrencyAdapterDecimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/USDT.png',
    infoUrl: 'https://www.coingecko.com/en/coins/tether',
    isCashInEligible: true,
    isStableCoin: true,
    lastKnownPriceUsd: '1',
    minimumAppVersionToSwap: '0.0.0',
    name: 'Tether USD',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'USD₮',
    tokenId: 'celo-mainnet:0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e',
  },
  {
    address: '0x456a3d042c0dbd3db53d5489e98dfb038553b0d0',
    balance: '10',
    canTransferWithComment: true,
    decimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cKES.png',
    infoUrl: 'https://www.coingecko.com/en/coins/celo-kenyan-shilling',
    isCashInEligible: true,
    isCashOutEligible: true,
    isCoreToken: true,
    isFeeCurrency: true,
    isStableCoin: true,
    lastKnownPriceUsd: '0.00770936',
    minimumAppVersionToSwap: '0.0.0',
    name: 'Celo Kenyan Shilling',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'cKES',
    tokenId: 'celo-mainnet:0x456a3d042c0dbd3db53d5489e98dfb038553b0d0',
  },
  {
    address: '0xfaea5f3404bba20d3cc2f8c4b0a888f55a3c7313',
    balance: '60',
    canTransferWithComment: true,
    decimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cGHS.png',
    infoUrl: 'https://www.coingecko.com/en/coins/cghs',
    isCoreToken: true,
    isFeeCurrency: true,
    isStableCoin: true,
    lastKnownPriceUsd: '0.08159',
    minimumAppVersionToSwap: '0.0.0',
    name: 'Celo Ghanaian Cedi',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'cGHS',
    tokenId: 'celo-mainnet:0xfaea5f3404bba20d3cc2f8c4b0a888f55a3c7313',
  },
  {
    address: '0x4c35853a3b4e647fd266f4de678dcc8fec410bf6',
    balance: '0',
    canTransferWithComment: true,
    decimals: 18,
    historicalPricesUsd: { lastDay: [] },
    imageUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
    infoUrl: 'https://www.coingecko.com/en/coins/celo-south-african-rand',
    isCoreToken: true,
    isFeeCurrency: true,
    isStableCoin: true,
    lastKnownPriceUsd: '0.055443',
    minimumAppVersionToSwap: '0.0.0',
    name: 'Celo South African Rand',
    networkIconUrl:
      'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/CELO.png',
    networkId: 'celo-mainnet',
    priceFetchedAt: 1747744084954,
    priceUsd: null,
    showZeroBalance: true,
    symbol: 'cZAR',
    tokenId: 'celo-mainnet:0x4c35853a3b4e647fd266f4de678dcc8fec410bf6',
  },
]

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
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedCountry)
  const [items, setItems] = React.useState([
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

  React.useEffect(() => {
    setSelectedCountry(value)
  }, [value])

  React.useEffect(() => {
    if (!tokens || tokens.length === 0) return
    setUsdBalance(calculateTotalUsdValue(tokens))
  }, [tokens])

  return (
    <View style={tw`flex-1 pt-0 gap-4 items-center`}>
      <View
        style={tw`flex-5 bg-[#D7E1FF] w-[100%] justify-center items-center`}
      >
        <View style={tw`flex-2.5 pt-2 w-[100%] justify-center items-center`}>
          <Card
            style={tw` flex-1 bg-[#0034BB] w-[90%] h-[95%] gap-4 justify-between z-10`}
          >
            {/* Wallet Title */}
            <View style={tw`flex-row gap-4`}>
              <Text style={{ color: '#AEC5FF' }}>Wallet Balance</Text>
              <TouchableOpacity
                onPress={() => setBalanceHidden(!balanceHidden)}
              ></TouchableOpacity>
            </View>

            {/* Wallet Balance */}
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-row gap-2`}>
                <Text
                  style={{
                    color: '#AEC5FF',
                    fontWeight: '500',
                    fontSize: 33,
                    lineHeight: 33,
                    letterSpacing: -1,
                  }}
                >
                  $
                </Text>
                <Text
                  style={{
                    color: '#E4EBFE',
                    fontWeight: '500',
                    fontSize: 32,
                    lineHeight: 32,
                    letterSpacing: -2,
                  }}
                >
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
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  textStyle={{
                    fontSize: 10,
                    fontWeight: '400',
                    letterSpacing: 0,
                    verticalAlign: 'bottom',
                  }}
                  dropDownContainerStyle={{
                    zIndex: 1000,
                    width: '76.5%',
                    marginLeft: '22.5%',
                    backgroundColor: '#8DADFE',
                    borderRadius: 4,
                    borderWidth: 0,
                  }}
                  style={tw`h-6 w-26 border-transparent bg-[#8DADFE] ml-7.5   rounded text-lg`}
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={tw`flex-row justify-between items-center gap-2`}>
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-sm text-[#1B1A46]`}
                iconName="send"
                iconPostion="left"
                lable="Send"
                onPress={onPressSendMoney}
              />
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-sm text-[#1B1A46]`}
                iconName="arrow-down"
                iconPostion="left"
                lable="Receive"
                onPress={onPressRecieveMoney}
              />
              <IconButton
                style={tw`border-1 border-[#789EFF]`}
                textStyle={tw`font-medium text-sm text-[#1B1A46]`}
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
              style={tw`pt-2 pb-2 text-left self-start font-medium text-sm text-[#1B1A46]`}
            >
              Quick Utilities
            </Text>
            <FlatList
              data={services[selectedCountry]}
              keyExtractor={(item) => item.name}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={tw`w-2`} />}
              renderItem={({ item }) => (
                <Pressable
                  key={item.name}
                  onPress={() => {
                    console.log(`Navigate to ${item.navigate}`)
                    navigate(item.navigate)
                  }}
                  style={tw`justify-center items-center bg-[#C0D0FF] rounded  px-6 border border-[#AEC5FF] py-2.5`}
                >
                  <item.icon width={16} height={20} />
                  <Text
                    style={tw`text-[10px] text-center font-normal text-[#002586] leading-4`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>

      {/* Promotion */}
      <View
        style={tw`flex-1.5 w-[100%] bg-transparent justify-center items-center`}
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
        <View style={tw`px-2 pt-2 pb-2`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`font-medium text-base text-[#1B1A46]`}>
              My Assets
            </Text>
            <SearchIcon width={22} height={22} />
          </View>

          <FlatList
            data={tokens}
            keyExtractor={(item) => item.tokenId}
            contentContainerStyle={tw`pb-4`}
            renderItem={({ item }) => (
              <View
                style={tw`flex-row items-center bg-white rounded-lg  py-2 mb-2`}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={tw`w-9 h-9 mr-3`}
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
