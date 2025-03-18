import { createApp } from "@divvi/mobile";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import BrandLogo from "./assets/BrandLogo";
import WelcomeLogo from "./assets/WelcomeLogo";
import HomeScreen from "./screens/HomeScreen";
import ActivityIcon from "./assets/ActivityTabIcon";
import { CKES_TOKEN_ID, CUSD_TOKEN_ID, colors } from "./utils";
import GetStarted from "./components/GetStarted";
import React from "react";

const expoConfig = Constants.expoConfig;
if (!expoConfig) {
  throw new Error("expoConfig is not available");
}
const App = createApp({
  registryName: "cKash",
  displayName: expoConfig.name,
  deepLinkUrlScheme: expoConfig.scheme
    ? Array.isArray(expoConfig.scheme)
      ? expoConfig.scheme[0]
      : expoConfig.scheme
    : "example",
  // Uncomment this to enable the Divvi protocol and set your referrer ID and protocol IDs
  // divviProtocol: {
  //   protocolIds: ["somm"],
  //   referrerId: "some-referrer-id",
  // },
  features: {
    cloudBackup: true,
  },
  themes: {
    default: {
      assets: {
        brandLogo: BrandLogo,
        welcomeLogo: WelcomeLogo,
        onboardingSuccessImage: require("./assets/onboarding-success.png"),
        biometryImages: {
          face: require("./assets/biometry/face.png"),
          faceId: require("./assets/biometry/face-id.png"),
          fingerprint: require("./assets/biometry/fingerprint.png"),
          touchId: require("./assets/biometry/touch-id.png"),
          iris: require("./assets/biometry/iris.png"),
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
          {
            name: "Home",
            component: HomeScreen,
            icon: defaultTabs.activity.icon,
            label: defaultTabs.activity.label,
          },
          {
            ...defaultTabs.activity,
            label: (t) => t("activity"),
            icon: ActivityIcon,
          },
        ],
        initialScreen: "Home",
      };
    },
  },
  locales: {
    "en-US": require("./locales/en-US.json"),
  },
  networks: {
    enabledNetworkIds: ["celo-mainnet"],
  },
  experimental: {
    activity: {
      hideActionsCarousel: true,
    },
    tokens: {
      enabledTokenIds: [CUSD_TOKEN_ID, CKES_TOKEN_ID],
      overrides: {
        [CKES_TOKEN_ID]: {
          showZeroBalance: true,
        },
      },
    },
    transactions: {
      emptyState: <GetStarted />,
    },
  },
});

registerRootComponent(App);
