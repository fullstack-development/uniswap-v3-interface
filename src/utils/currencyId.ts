import { Currency } from '@alagunoff/uniswap-sdk-core'

export function currencyId(currency: Currency): string {
  if (currency.isEther) return 'ETH'
  if (currency.isPol) return 'POL'
  if (currency.isToken) return currency.address
  throw new Error('invalid currency')
}
