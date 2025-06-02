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
import { Picker } from '@react-native-picker/picker'
import Button from '../components/ui/Button'
import { useTokens } from '../utils'
import DropDownPicker from 'react-native-dropdown-picker'
//import Icon from "react-native-vector-icons/Feather"
//import Feather from "react-native-vector-icons/Feather";

import ckashxmento from '../assets/ckashxmento.png'
import IconButton from '../components/ui/IconButton'

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

export type Service = {
  name: string
  icon: string
  navigate: string | any
}
const services: Record<string, Service[]> = {
  Kenya: [
    {
      name: 'M-Pesa',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'KenyaSendMoney',
    },
    {
      name: 'Air-time',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'KenyaSendMoney', // Temporarily point to an existing screen until KenyaAirtime is implemented
    },
    {
      name: 'Data',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'KenyaSendMoney', // Temporarily point to an existing screen until KenyaData is implemented
    },
    {
      name: 'Paybill',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'KenyaSendMoney', // Temporarily point to an existing screen until KenyaPaybill is implemented
    },
  ],
  Uganda: [
    {
      name: 'MTN',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'UgandaAirtime',
    },
  ],
  Nigeria: [
    {
      name: 'Send',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'NigeriaSendMoney',
    },
    {
      name: 'Air-time',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'NigeriaAirtime',
    },
  ],
  Ghana: [
    {
      name: 'MTN',
      icon: 'https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png',
      navigate: 'KenyaSendMoney', // Temporarily point to an existing screen until GhanaMTN is implemented
    },
  ],
}

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

    const totalValueInUsd = tokens.reduce((total, token) => {
      const balance = parseFloat((token.balance as any) || '0')
      const price = parseFloat((token.lastKnownPriceUsd as any) || '0')

      if (isNaN(balance) || isNaN(price) || balance === 0 || price === 0) {
        return total
      }

      return total + balance * price
    }, 0)

    setUsdBalance(parseFloat(totalValueInUsd.toFixed(4)))
  }, [tokens])

  return (
    <View style={style.container}>
      <View style={style.wallet}>
        <View style={style.cardWallet}>
          <Card style={style.card_wallet}>
            {/* Wallet Title */}
            <View style={style.wallet_title}>
              <Text style={{ color: '#AEC5FF' }}>Wallet Balance</Text>
              <TouchableOpacity
                onPress={() => setBalanceHidden(!balanceHidden)}
              >
                {/** <FeatherIcon name={balanceHidden? "eye-off":"eye"} size={22} color="#E4EBFE"/>
                 <FeatherIcon name={balanceHidden? "eye-off":"eye"} size={22} color="#E4EBFE"/> */}
              </TouchableOpacity>
            </View>

            {/* Wallet Balance */}
            <View style={style.wallet_balance}>
              <View style={style.balance}>
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
                {/* <Picker
        selectedValue={selectedCountry}
        onValueChange={(value) => setSelectedCountry(value)}
        style={{ marginBottom: 4 }}
      >
        {Object.keys(services).map((country) => (
          <Picker.Item key={country} label={country} value={country} />
        ))}
      </Picker> */}
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
                  // zIndex={1000}
                  dropDownContainerStyle={{ zIndex: 1000 }}
                  style={{
                    marginBottom: open ? 0 : 0,
                    zIndex: 1000,
                    height: 30,
                    borderColor: 'transparent',
                    backgroundColor: '#8DADFE',
                    paddingVertical: 0,
                  }}
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={style.button_wallet}>
              <IconButton
                style={style.button}
                textStyle={style.button_text}
                iconName="send"
                iconPostion="left"
                lable="Send"
                onPress={onPressSendMoney}
              />
              <IconButton
                style={style.button}
                textStyle={style.button_text}
                iconName="arrow-down"
                iconPostion="left"
                lable="Receive"
                onPress={onPressRecieveMoney}
              />
              <IconButton
                style={style.button}
                textStyle={style.button_text}
                iconName="swap-horizontal"
                iconPostion="left"
                lable="Swap"
                onPress={onPressHoldUSD}
              />
              {/* <IconButton style={style.button} textStyle={style.button_text} iconName="send" iconPostion="left"  lable="Buy" onPress={() => {}} /> */}
            </View>
          </Card>
        </View>

        {/* Services */}
        <View style={style.wallet_services}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                letterSpacing: 0,
                verticalAlign: 'bottom',
                color: '#1B1A46',
              }}
            >
              Quick Utilities
            </Text>
            {/* <Text>Edit</Text> */}
          </View>
          <View style={style.services}>
            <FlatList
              data={services[selectedCountry]}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    console.log(`Navigate to ${item.navigate}`)
                    navigate(item.navigate)
                  }}
                  style={{
                    alignItems: 'center',

                    backgroundColor: '#C0D0FF',
                    borderRadius: 4,
                    width: 75,
                    height: 61,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: '#AEC5FF',
                    paddingVertical: 12,
                    gap: 7,
                  }}
                >
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: 'center',
                      fontWeight: '400',
                      color: '#002586',
                      verticalAlign: 'bottom',
                      lineHeight: 16,
                      letterSpacing: 0,
                    }}
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
      <View style={style.promotion}>
        <Card style={style.promotion_card}>
          <TouchableOpacity
            style={style.promotion_logo}
            onPress={() => Linking.openURL(currentPromo.externalLink)}
          >
            {/* <Image source={{ uri: requirecurrentPromo.logoOne }} style={{ width: 100, height: 100 }} /> */}
            <Image
              resizeMode="contain"
              source={require('../assets/ckashxmento.png')}
              style={{ width: '100%' }}
            />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Tokens */}
      <View style={style.tokens}>
        <View style={style.tokens_title}>
          <Text>My Assets</Text>
          <Text>Search</Text>
        </View>

        <FlatList
          data={tokens}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={style.tokens_container}
          renderItem={({ item }) => (
            <Card style={style.tokens_card}>
              <View style={style.token_image_name_symbol}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={style.token_image}
                  resizeMode="contain"
                />
                <View style={style.token_name_info}>
                  <Text style={style.token_symbol}>{item.symbol}</Text>

                  <Text style={style.token_name}>{item.name}</Text>
                </View>
              </View>

              <View style={style.token_name_info}>
                <View style={style.token_balance_symbol}>
                  <Text style={style.token_balance}>
                    {Number(item.balance).toFixed(4)}
                  </Text>
                  <Text style={style.token_symbol}>{item.symbol}</Text>
                </View>

                <Text style={style.token_dollar_amount}>
                  $
                  {(
                    Number(item.balance) * Number(item.lastKnownPriceUsd)
                  ).toFixed(4)}
                </Text>
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    gap: 4,
    alignItems: 'center',
  },
  wallet: {
    flex: 5,
    backgroundColor: '#D7E1FF',
    width: '100%',
  },
  cardWallet: {
    flex: 2.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_wallet: {
    backgroundColor: '#0034BB',
    width: '90%',
    height: '90%',
    paddingHorizontal: 16,
    gap: 4,
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  wallet_title: {
    flexDirection: 'row',
    gap: 10,
  },
  wallet_balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balance: {
    flexDirection: 'row',
    gap: 8,
    verticalAlign: 'bottom',
  },
  button_wallet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  button: {
    borderWidth: 1,
    borderColor: '#789EFF',
  },
  button_text: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: 'center',
  },
  wallet_services: {
    flex: 1.5,
    paddingHorizontal: 16,
    gap: 10,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promotion: {
    flex: 1.5,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokens: {
    flex: 4,
    width: '100%',
    paddingHorizontal: 16,
    // backgroundColor: "green",
  },
  tokens_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokens_container: {
    paddingHorizontal: 16,
    // paddingBottom: 100
  },
  tokens_card: {
    // height:"20%",
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    gap: 1,
    padding: 0,
    justifyContent: 'space-between',
  },
  token_name: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#000F35',
    verticalAlign: 'bottom',
  },
  image: {
    width: 20,
    height: 20,
    marginBottom: 12,
  },
  token_image: {
    width: 36,
    height: 36,
    marginBottom: 12,
  },
  token_symbol: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#001E6B',
    verticalAlign: 'bottom',
  },
  token_name_info: {
    flexDirection: 'column',
    gap: 1,
  },
  token_image_name_symbol: {
    flexDirection: 'row',
    gap: 16,
  },
  token_balance_symbol: {
    flexDirection: 'row',
    gap: 4,
  },
  token_balance: {
    color: '#001E6B',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    verticalAlign: 'bottom',
  },
  token_dollar_amount: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    verticalAlign: 'bottom',
  },
  promotion_logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotion_card: {
    backgroundColor: 'transparent',
    width: '90%',
    height: '90%',
    paddingHorizontal: 16,
    gap: 4,
    justifyContent: 'space-between',
    padding: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 0,
    marginVertical: 0,
  },
})
