// a list of tokens by chain
import { ChainId, Token, WETH9 } from '@alagunoff/uniswap-sdk-core'
import { METALAMP, USDT, USDC, WBTC } from './tokens'

type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.POLYGON_AMOY]: [WETH9[ChainId.POLYGON_AMOY]],
}
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.POLYGON_AMOY]: [
    ...WETH_ONLY[ChainId.POLYGON_AMOY],
    METALAMP[ChainId.POLYGON_AMOY],
    USDC[ChainId.POLYGON_AMOY],
    USDT[ChainId.POLYGON_AMOY],
    WBTC[ChainId.POLYGON_AMOY],
  ],
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: Partial<ChainTokenList> = {
  [ChainId.POLYGON_AMOY]: [METALAMP[ChainId.POLYGON_AMOY], USDT[ChainId.POLYGON_AMOY]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
}
