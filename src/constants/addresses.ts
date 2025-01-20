import { ChainId } from '@alagunoff/uniswap-sdk-core'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'

export const UNI_ADDRESS = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL2_ADDRESSES = {
  [ChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ROPSTEN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.RINKEBY]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.GÖRLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.KOVAN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.POLYGON_AMOY]: '0xAc84922226D254Ec01Ad731F3094214940E61f2c',
}
export const V2_ROUTER_ADDRESS = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')
export const GOVERNANCE_ADDRESS = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
export const TIMELOCK_ADDRESS = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V2_CORE_FACTORY_ADDRESSES = {
  [ChainId.MAINNET]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.ROPSTEN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.RINKEBY]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.GÖRLI]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.KOVAN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.POLYGON_AMOY]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
}
export const PAIR_INIT_CODE_HASHES = {
  [ChainId.MAINNET]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.ROPSTEN]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.RINKEBY]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.GÖRLI]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.KOVAN]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.POLYGON_AMOY]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
}
export const V3_CORE_FACTORY_ADDRESSES = {
  [ChainId.MAINNET]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.ROPSTEN]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.RINKEBY]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.GÖRLI]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.KOVAN]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.POLYGON_AMOY]: '0x8fa8F86d4339afdC0A1911E8C8b22bF096DBeC65',
}
export const POOL_INIT_CODE_HASHES = {
  [ChainId.MAINNET]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  [ChainId.ROPSTEN]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  [ChainId.RINKEBY]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  [ChainId.GÖRLI]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  [ChainId.KOVAN]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  [ChainId.POLYGON_AMOY]: '0x5cbb8bb02cda6c7c4793e82230914ebc54ed194586a4670cff86a5883f4616b1',
}
export const QUOTER_ADDRESSES = {
  [ChainId.MAINNET]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [ChainId.ROPSTEN]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [ChainId.RINKEBY]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [ChainId.GÖRLI]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [ChainId.KOVAN]: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  [ChainId.POLYGON_AMOY]: '0xCf097B2507F346B0a23C001A51a21841FA74d402',
}
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = {
  [ChainId.MAINNET]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [ChainId.ROPSTEN]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [ChainId.RINKEBY]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [ChainId.GÖRLI]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [ChainId.KOVAN]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [ChainId.POLYGON_AMOY]: '0xAAd8A51266fD8F51325E8f1e8B8170dF35f8C540',
}
export const ENS_REGISTRAR_ADDRESSES = constructSameAddressMap('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e')
export const SOCKS_CONTROLLER_ADDRESSES = {
  [ChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES = {
  [ChainId.MAINNET]: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  [ChainId.ROPSTEN]: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  [ChainId.RINKEBY]: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  [ChainId.GÖRLI]: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  [ChainId.KOVAN]: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  [ChainId.POLYGON_AMOY]: '0xfee1FE242250C1b47D4AB0943667939b7a3Da5B5',
}
export const V3_MIGRATOR_ADDRESSES = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34')

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  POLYGON_AMOY = 80002,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.POLYGON_AMOY,
]
