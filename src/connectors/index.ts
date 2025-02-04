import { ChainId } from '@alagunoff/uniswap-sdk-core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import getLibrary from '../utils/getLibrary'

import { NetworkConnector } from './NetworkConnector'
import { SupportedChainId } from 'constants/addresses'

export const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.POLYGON_AMOY]: 'https://rpc-amoy.polygon.technology',
}

const SUPPORTED_CHAIN_IDS = [ChainId.POLYGON_AMOY]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: ChainId.POLYGON_AMOY,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})
