import { useWallet } from "@divvi/mobile";

export const CUSD_TOKEN_ID =
  "celo-mainnet:0x765de816845861e75a25fca122bb6898b8b1282a";
export const CKES_TOKEN_ID =
  "celo-mainnet:0x456a3d042c0dbd3db53d5489e98dfb038553b0d0";

export function useTokens() {
  const { tokens } = useWallet();
  const cKESToken = tokens.find((token) => token.tokenId === CKES_TOKEN_ID);
  const cUSDToken = tokens.find((token) => token.tokenId === CUSD_TOKEN_ID);
  return { cKESToken, cUSDToken };
}
