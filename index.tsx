import { createApp } from '@divvi/mobile'
import { registerRootComponent } from 'expo'
import Constants from 'expo-constants'
import BrandLogo from './assets/BrandLogo'
import WelcomeLogo from './assets/WelcomeLogo'
import HomeScreen from './screens/HomeScreen'
import ActivityIcon from './assets/ActivityTabIcon'
import {
  CKES_TOKEN_ID,
  CUSD_TOKEN_ID,
  USDC_TOKEN_ID,
  USDT_TOKEN_ID,
  cGHS_TOKEN_ID,
  cZAR_TOKEN_ID,
  colors,
} from './utils'
import GetStarted from './components/GetStarted'
import React from 'react'
import ServiceScreen from './screens/ServiceScreen'
import WalletScreen from './screens/WalletScreen'
import KenyaSendMoney from './screens/services/kenya/SendMoney'
import NigeriaSendMoney from './screens/services/nigeria/SendMoney'
import NigeriaAirtime from './screens/services/nigeria/Airtime'
import UgandaAirtime from './screens/services/uganda/Airtime'
import SendMoney from './screens/services/kenya/SendMoney'
import BuyAirtime from './screens/services/kenya/Airtime'
import BuyGoods from './screens/services/kenya/BuyGoods'
import PayBills from './screens/services/kenya/PayBills'

export function createStaticLabel(
  label: string,
): (t: (key: string) => string) => string {
  return () => label
}

const expoConfig = Constants.expoConfig
if (!expoConfig) {
  throw new Error('expoConfig is not available')
}
const App = createApp({
  registryName: 'cKash',
  displayName: expoConfig.name,
  deepLinkUrlScheme: expoConfig.scheme
    ? Array.isArray(expoConfig.scheme)
      ? expoConfig.scheme[0]
      : expoConfig.scheme
    : 'example',
  divviProtocol: {
    protocolIds: ['celo'],
    referrerId: 'cKash',
  },
  features: {
    cloudBackup: true,
  },
  themes: {
    default: {
      assets: {
        brandLogo: BrandLogo,
        welcomeLogo: WelcomeLogo,
        onboardingSuccessImage: require('./assets/onboarding-success.png'),
        biometryImages: {
          face: require('./assets/biometry/face.png'),
          faceId: require('./assets/biometry/face-id.png'),
          fingerprint: require('./assets/biometry/fingerprint.png'),
          touchId: require('./assets/biometry/touch-id.png'),
          iris: require('./assets/biometry/iris.png'),
        },
        backupAndRecoveryImages: {
          walletSafe: require('./assets/backup-and-recovery/wallet-safe.png'),
          cloudBackupEmail: require('./assets/backup-and-recovery/email.png'),
          recoveryPhraseEducation1: require('./assets/backup-and-recovery/recover-phrase.png'),
          recoveryPhraseEducation2: require('./assets/backup-and-recovery/dont-lose.png'),
          recoveryPhraseEducation3: require('./assets/backup-and-recovery/write-down.png'),
          recoveryPhraseEducation4: require('./assets/backup-and-recovery/private-phrase.png'),
        },
      },
      colors,
    },
  },
  screens: {
    tabs: ({ defaultTabs }) => {
      return {
        screens: [
          defaultTabs.wallet,
          // {
          //   name: 'Home',
          //   component: HomeScreen,
          //   icon: defaultTabs.activity.icon,
          //   label: defaultTabs.activity.label,
          // },
          {
            name: 'Utilities',
            component: ServiceScreen,
            icon: defaultTabs.activity.icon,
            // label: defaultTabs.activity.label,
            label: createStaticLabel('Utility'),
          },
          {
            ...defaultTabs.activity,
            label: (t) => t('activity'),
            icon: ActivityIcon,
          },
          {
            name: 'Wallet',
            component: WalletScreen,
            icon: defaultTabs.activity.icon,
            // label: defaultTabs.activity.label,
            label: createStaticLabel('Wallet'),
          },
        ],
        // initialScreen: 'Home',
        initialScreen: 'Wallet',
      }
    },
    custom: (Screen) => (
      <>
        <Screen
          name="KenyaSendMoney"
          component={KenyaSendMoney}
          options={{
            headerBackVisible: true,
            headerShown: true,
          }}
        />

        <Screen
          name="NigeriaSendMoney"
          component={NigeriaSendMoney}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: 'Send Money',
          }}
        />

        <Screen
          name="NigeriaAirtime"
          component={NigeriaAirtime}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: 'Buy Airtime',
          }}
        />

        <Screen
          name="UgandaAirtime"
          component={UgandaAirtime}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: 'Buy Airtime',
          }}
        />
       
      <Screen name="KenyaBuyAirtime"
     component={BuyAirtime}
     options={{
      headerBackVisible:true,
      headerShown:true
     }}
     />
     <Screen name="KenyaBuyGoods"
     component={BuyGoods}
     options={{
      headerBackVisible:true,
      headerShown:true
     }}
     />
     <Screen name="KenyaPayBills"
     component={PayBills}
     options={{
      headerBackVisible:true,
      headerShown:true
     }}
     />
      </>
    )
  },

  locales: {
    'en-US': require('./locales/en-US.json'),
  },
  networks: {
    enabledNetworkIds: ['celo-mainnet'],
  },
  experimental: {
    activity: {
      hideActionsCarousel: true,
    },
    tokens: {
      enabledTokenIds: [
        CUSD_TOKEN_ID,
        CKES_TOKEN_ID,
        USDC_TOKEN_ID,
        USDT_TOKEN_ID,
        cGHS_TOKEN_ID,
        cZAR_TOKEN_ID,
      ],
      overrides: {
        [CKES_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [USDC_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [cGHS_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [cZAR_TOKEN_ID]: {
          showZeroBalance: true,
        },
      },
    },
    transactions: {
      emptyState: <GetStarted />,
    },
    hideCashInTokenFilters: true,
    disableNfts: true,
    showPositions: false,
    showImportTokensFlow: false,
    showSwapTokenFilters: false,
    enableSwapAppFee: false,
  },
})

registerRootComponent(App)
