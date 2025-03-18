import { useWallet } from '@divvi/mobile'

export const CUSD_TOKEN_ID =
  'celo-mainnet:0x765de816845861e75a25fca122bb6898b8b1282a'
export const CKES_TOKEN_ID =
  'celo-mainnet:0x456a3d042c0dbd3db53d5489e98dfb038553b0d0'

export function useTokens() {
  const { tokens } = useWallet()
  const cKESToken = tokens.find((token) => token.tokenId === CKES_TOKEN_ID)
  const cUSDToken = tokens.find((token) => token.tokenId === CUSD_TOKEN_ID)
  return { cKESToken, cUSDToken }
}

export const colors = {
  // backgrounds
  backgroundPrimary: "#FFFFFF", // Main background color for the app, used for primary surfaces (screens, navigation).
  backgroundSecondary: "#FFFFFF", // Subtle contrast background for secondary surfaces like cards, panels, or inputs.
  backgroundTertiary: "#DFE8FF", // Low-emphasis background for subtle supporting areas, typically used when both primary and secondary backgrounds are present, and an additional layer of distinction is needed.
  backgroundScrim: "#000000", // Semi-transparent underlay behind bottom sheets, modals, dialogs, and other temporary surfaces to dim the background.

  // text, icons, and other content
  contentPrimary: "#002586", // main content on primary background
  contentSecondary: "#595F6F", // supporting context on primary background
  contentTertiary: "#FFFFFF", // content on colored backgrounds
  textLink: "#595F6F", // underlined text links on primary background

  // borders, shadows, highlights, visual effects
  borderPrimary: "#002586", // Border color used to create emphasis or highlight key areas.
  borderSecondary: "#002586", // Border color used to define or separate secondary content.
  softShadow: "rgba(156, 164, 169, 0.4)",
  lightShadow: "rgba(48, 46, 37, 0.15)",
  barShadow: "rgba(129, 134, 139, 0.5)",
  skeletonPlaceholderHighlight: "#EFF3FF", // animated highlight color on skeleton loaders
  skeletonPlaceholderBackground: "#AEC5FF", // background color on skeleton loaders
  loadingIndicator: "#1B5BFF", // spinner or loading indicator

  // interactive elements
  navigationTopPrimary: "#002586", // color for text and icons on top navigation
  navigationTopSecondary: "#595F6F", // secondary color for text and icons on top navigation
  navigationBottomPrimary: "#1B5BFF", // color for text and icons on bottom navigation
  navigationBottomSecondary: "#595F6F", // secondary color for text and icons on bottom navigation
  bottomSheetHandle: "#D8D8D8", // color for bottom sheet handle
  buttonPrimaryBackground: "#1B5BFF", // Background color for primary buttons (high-priority actions).
  buttonPrimaryContent: "#FFFFFF", // Text and icon color for primary buttons.
  buttonPrimaryBorder: "#1B5BFF", // Border color for primary buttons.
  buttonSecondaryBackground: "#FFFFFF", // Background color for secondary buttons (less emphasized actions).
  buttonSecondaryContent: "#002586", // Text and icon color for secondary buttons.
  buttonSecondaryBorder: "#002586", // Border color for secondary buttons.
  textInputBackground: "#FFFFFF", // Background color for text input fields.
  qrTabBarPrimary: "#002586", // color for text and icons on QR tab bar
  qrTabBarSecondary: "#FFFFFF", // secondary color for text and icons on QR tab bar

  // statuses and UI feedback colors
  disabled: "#E6E6E6", // Used for disabled elements that are non-interactive or visually de-emphasized.
  inactive: "#595F6F", // Represents inactive or placeholder elements, often less prominent but still visible.
  info: "#F8F9F9", // Background for neutral or informational states, typically non-critical.
  successPrimary: "#137211", // Indicates successful actions or positive states, often used for icons or highlights.
  successSecondary: "#F1FDF1", // Subtle background for success states, such as notifications or banners.
  warningPrimary: "#9C6E00", // Highlights warning states, used to draw attention to cautionary information.
  warningSecondary: "#FFF9EA", // Subtle background for warning states, providing gentle emphasis without overpowering.
  errorPrimary: "#C93717", // Represents error or failure states, used for critical feedback or alerts.
  errorSecondary: "#FBF2F0", // Subtle background for error states, providing softer emphasis in contexts like modals or notifications.

  // brand colors for decorative elements
  accent: "#1B5BFF", // Accent color for emphasizing key elements, such as highlights, icons, or decorative details.
  brandGradientLeft: "#002586", // Starting color for the brand gradient, used in backgrounds or borders to reinforce brand identity.
  brandGradientRight: "#002586", // Ending color for the brand gradient, used in backgrounds or borders to reinforce brand identity.
  contentOnboardingComplete: "#FFFFFF", // Text and image color for onboarding completion screen
};

// Import from @divvi-mobile once exposed
export const typeScale = {
  labelSemiBoldMedium: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: colors.contentPrimary,
  },
  labelMedium: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 24,
    color: colors.contentPrimary,
  },
  bodySmall: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentPrimary,
  },
};
