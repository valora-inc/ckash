import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { navigate, useWallet } from "@divvi/mobile";
import Touchable from "@divvi/mobile/src/components/Touchable";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { RootStackScreenProps } from "./types";
import Add from "../assets/home/Add";
import Receive from "../assets/home/Receive";
import Swap from "../assets/home/Swap";
import Withdraw from "../assets/home/Withdraw";
import Send from "../assets/home/Send";

const cUsdTokenId = "celo-mainnet:0x765de816845861e75a25fca122bb6898b8b1282a";
const cKesTokenId = "celo-mainnet:0x456a3d042c0dbd3db53d5489e98dfb038553b0d0";

function FlatCard({
  onPress,
  testID,
  ...props
}: {
  children: React.ReactNode;
  onPress: () => void;
  testID: string;
}) {
  return (
    <Touchable
      borderRadius={12}
      style={styles.flatCard}
      testID={testID}
      onPress={onPress}
      {...props}
    />
  );
}

function useTokens() {
  const { tokens } = useWallet();
  const cKESToken = tokens.find((token) => token.tokenId === cKesTokenId);
  const cUSDToken = tokens.find((token) => token.tokenId === cUsdTokenId);
  return { cKESToken, cUSDToken };
}

export default function HomeScreen(_props: RootStackScreenProps<"Home">) {
  const { t } = useTranslation();
  const addCKESBottomSheetRef = useRef<BottomSheetModal>(null);

  const { cKESToken, cUSDToken } = useTokens();

  function onPressAddCKES() {
    if (cUSDToken?.balance.isZero()) {
      !!cKESToken && navigate("Add", { tokenId: cKESToken.tokenId });
    } else {
      addCKESBottomSheetRef.current?.snapToIndex(0);
    }
  }

  function onPressSendMoney() {
    !!cKESToken && navigate("Send");
  }

  function onPressRecieveMoney() {
    navigate("Receive");
  }

  function onPressHoldUSD() {
    !!cKESToken &&
      !!cUSDToken &&
      navigate("Swap", {
        fromTokenId: cKESToken.tokenId,
        toTokenId: cUSDToken.tokenId,
      });
  }

  function onPressWithdraw() {
    // TODO(sravi): figure out how to copy behavior from existing app (no spend
    // option)
    navigate("Withdraw");
  }

  return (
    <View testID="Home" style={styles.container}>
      <FlatCard testID="FlatCard/AddCKES" onPress={onPressAddCKES}>
        <View style={styles.column}>
          <Add />
          <Text style={styles.ctaText}>{t("home.addCKES")}</Text>
        </View>
      </FlatCard>
      <View style={styles.row}>
        <View style={styles.flex}>
          <FlatCard testID="FlatCard/SendMoney" onPress={onPressSendMoney}>
            <View style={styles.column}>
              <Send />
              <Text style={styles.ctaText}>{t("home.sendMoney")}</Text>
            </View>
          </FlatCard>
        </View>
        <View style={styles.flex}>
          <FlatCard
            testID="FlatCard/ReceiveMoney"
            onPress={onPressRecieveMoney}
          >
            <View style={styles.column}>
              <Receive />
              <Text style={styles.ctaText}>{t("home.receiveMoney")}</Text>
            </View>
          </FlatCard>
        </View>
      </View>
      <FlatCard testID="FlatCard/HoldUSD" onPress={onPressHoldUSD}>
        <View style={styles.row}>
          <Swap />
          <View style={styles.flex}>
            <Text style={styles.ctaText}>{t("home.holdUSD")}</Text>
            <Text style={styles.ctaSubText}>{t("home.swapToUSD")}</Text>
          </View>
        </View>
      </FlatCard>
      <FlatCard testID="FlatCard/Withdraw" onPress={onPressWithdraw}>
        <View style={styles.row}>
          <Withdraw />
          <Text style={styles.ctaText}>{t("home.withdraw")}</Text>
        </View>
      </FlatCard>
      <AddCKESBottomSheet forwardedRef={addCKESBottomSheetRef} />
    </View>
  );
}

function AddCKESBottomSheet({
  forwardedRef,
}: {
  forwardedRef: React.RefObject<BottomSheetModal>;
}) {
  // Import here to avoid race condition with appConfig. importing this at the
  // top level would mean appConfig is read before it is set by createApp
  // causing a crash
  const BottomSheet =
    require("@divvi/mobile/src/components/BottomSheet").default;
  const { t } = useTranslation();
  const { cKESToken, cUSDToken } = useTokens();

  function onPressSwapFromCusd() {
    !!cUSDToken &&
      !!cKESToken &&
      navigate("Swap", {
        fromTokenId: cUSDToken.tokenId,
        toTokenId: cKESToken.tokenId,
      });
    forwardedRef.current?.dismiss();
  }

  function onPressPurchaseCkes() {
    !!cKESToken && navigate("Add", { tokenId: cKESToken.tokenId });
    forwardedRef.current?.dismiss();
  }

  return (
    <BottomSheet
      title={t("home.addCKES")}
      forwardedRef={forwardedRef}
      testId="AddCKESBottomSheet"
    >
      <View style={styles.bottomSheetContainer}>
        <FlatCard testID="FlatCard/AddFromCUSD" onPress={onPressSwapFromCusd}>
          <View style={styles.row}>
            <Swap />
            <View style={styles.flex}>
              <Text style={styles.bottomSheetCtaText}>
                {t("home.addCKESBottomSheet.addCKESFromCUSD")}
              </Text>
              <Text style={styles.bottomSheetCtaSubText}>
                {t("home.addCKESBottomSheet.bySwapping")}
              </Text>
            </View>
          </View>
        </FlatCard>
        <FlatCard testID="FlatCard/PurchaseCKES" onPress={onPressPurchaseCkes}>
          <View style={styles.row}>
            <Add />
            <View style={styles.flex}>
              <Text style={styles.bottomSheetCtaText}>
                {t("home.addCKESBottomSheet.purchase")}
              </Text>
              <Text style={styles.bottomSheetCtaSubText}>
                {t("home.addCKESBottomSheet.purchaseDescription")}
              </Text>
            </View>
          </View>
        </FlatCard>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Padding applied to the content of the screen on sides and top
    // No padding applied to the bottom by default incase of a scrollable screen
    paddingHorizontal: 16,
    paddingTop: 16,
    position: "relative",
    gap: 16,
  },
  flatCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderColor: "#002586",
    borderWidth: 1,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    // ...typeScale.labelSemiBoldMedium,
    color: "#002586",
  },
  ctaSubText: {
    // ...typeScale.bodySmall,
    color: "#595F6F",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  bottomSheetContainer: {
    gap: 16,
    paddingVertical: 24,
  },
  bottomSheetCtaText: {
    // ...typeScale.labelMedium,
    color: "#002586",
  },
  bottomSheetCtaSubText: {
    // ...typeScale.bodySmall,
    color: "#002586",
  },
});
