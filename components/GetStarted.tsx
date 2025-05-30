import { navigate, Button } from '@divvi/mobile'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Add from '../assets/home/Add'
import { colors, typeScale, useTokens } from '../utils'

// hardcoding a fallback token symbol in case the token info is not loaded
const DEFAULT_TOKEN_SYMBOL = 'cKES'

export default function GetStarted() {
  const { t } = useTranslation()
  const { cKESToken } = useTokens()

  const goToAddFunds = () => {
    cKESToken &&
      navigate('Add', {
        tokenId: cKESToken.tokenId,
      })
  }

  return (
    <View testID="GetStarted" style={styles.container}>
      <Add />
      <Text style={styles.title}>
        {t('getStartedActivity.title', {
          tokenSymbol: cKESToken?.symbol ?? DEFAULT_TOKEN_SYMBOL,
        })}
      </Text>
      <View style={styles.ctaContainer}>
        <Button
          testID="GetStarted/cta"
          onPress={goToAddFunds}
          text={t('getStartedActivity.cta', {
            tokenSymbol: cKESToken?.symbol ?? DEFAULT_TOKEN_SYMBOL,
          })}
          type="primary"
          size="full"
          style={styles.cta}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderPrimary,
    borderWidth: 1,
    borderRadius: 12,
    margin: 16,
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    ...typeScale.labelSemiBoldMedium,
    color: colors.borderPrimary,
    textAlign: 'center',
    marginHorizontal: 32,
  },
  ctaContainer: {
    flexDirection: 'row',
  },
  cta: {
    flexGrow: 1,
  },
})
