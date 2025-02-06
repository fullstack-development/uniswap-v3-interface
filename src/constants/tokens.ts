import { ChainId, Token } from '@alagunoff/uniswap-sdk-core'

export const METALAMP = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0x9d88cEdB5E1E7B09Df99e70580Fd36253Cd0690D',
    18,
    'METALAMP',
    'MetaLamp fun'
  ),
}
export const BNB = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0xF61C6c1F4866C1296E2d239e9AEb20036272C3DD',
    18,
    'BNB',
    'BNB'
  ),
}
export const USDT = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0xF0602a35Fd6895bd62cDB4158BaC82689490afCE',
    6,
    'USDT',
    'Tether'
  ),
}
export const USDC = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0x24BD3A3EeabC51f11Ff724F4D0ed4b52569952c2',
    6,
    'USDC',
    'USDC'
  ),
}
export const WBTC = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0xDcaA4611e721ce9a06D568A0E45dfbBA161A28BA',
    8,
    'WBTC',
    'Wrapped Bitcoin'
  ),
}
export const SHIB = {
  [ChainId.POLYGON_AMOY]: new Token(
    ChainId.POLYGON_AMOY,
    '0x36fE2Bdb44f043034cb45A83C514a93a50b10489',
    18,
    'SHIB',
    'Shiba Inu'
  ),
}
