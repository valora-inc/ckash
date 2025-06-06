// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@divvi/mobile/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
)
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg',
)
config.resolver.sourceExts.push('svg')

module.exports = config
