import React, { useCallback, useMemo, useState } from 'react'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { calculateGasMargin } from '../../utils/calculateGasMargin'
import AppBody from '../AppBody'
import { BigNumber } from '@ethersproject/bignumber'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'
import { useBurnV3ActionHandlers, useBurnV3State, useDerivedV3BurnInfo } from 'state/burn/v3/hooks'
import Slider from 'components/Slider'
import { AutoRow, RowBetween, RowFixed } from 'components/Row'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import { AutoColumn } from 'components/Column'
import { ButtonConfirmed, ButtonPrimary } from 'components/Button'
import { LightCard } from 'components/Card'
import { Text } from 'rebass'
import CurrencyLogo from 'components/CurrencyLogo'
import FormattedCurrencyAmount from 'components/FormattedCurrencyAmount'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useActiveWeb3React } from 'hooks/web3'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { Percent, currencyEquals, Token, ETHER } from '@alagunoff/uniswap-sdk-core'
import { TYPE } from 'theme'
import { Wrapper, SmallMaxButton, ResponsiveHeaderText, Break } from './styled'
import Loader from 'components/Loader'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { NonfungiblePositionManager } from '@alagunoff/uniswap-v3-sdk'
import useTheme from 'hooks/useTheme'
import { AddRemoveTabs } from 'components/NavigationTabs'
import RangeBadge from 'components/Badge/RangeBadge'
import Toggle from 'components/Toggle'
import { unwrappedToken } from 'utils/wrappedCurrency'

export const UINT128MAX = BigNumber.from(2).pow(128).sub(1)

const DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

// redirect invalid tokenIds
export default function RemoveLiquidityV3({
  location,
  match: {
    params: { tokenId },
  },
}: RouteComponentProps<{ tokenId: string }>) {
  const parsedTokenId = useMemo(() => {
    try {
      return BigNumber.from(tokenId)
    } catch {
      return null
    }
  }, [tokenId])

  if (parsedTokenId === null || parsedTokenId.eq(0)) {
    return <Redirect to={{ ...location, pathname: '/pool' }} />
  }

  return <Remove tokenId={parsedTokenId} />
}
function Remove({ tokenId }: { tokenId: BigNumber }) {
  const { position } = useV3PositionFromTokenId(tokenId)
  const theme = useTheme()
  const { account, chainId, library } = useActiveWeb3React()

  // flag for receiving WETH
  const [receiveWETH, setReceiveWETH] = useState(false)

  // burn state
  const { percent } = useBurnV3State()
  const {
    position: positionSDK,
    liquidityPercentage,
    liquidityValue0,
    liquidityValue1,
    feeValue0,
    feeValue1,
    outOfRange,
    error,
  } = useDerivedV3BurnInfo(position, receiveWETH)
  const { onPercentSelect } = useBurnV3ActionHandlers()

  const removed = position?.liquidity?.eq(0)

  // boilerplate for the slider
  const [percentForSlider, onPercentSelectForSlider] = useDebouncedChangeHandler(percent, onPercentSelect)

  const deadline = useTransactionDeadline() // custom from users settings
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE) // custom from users

  const [showConfirm, setShowConfirm] = useState(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const [txnHash, setTxnHash] = useState<string | undefined>()
  const addTransaction = useTransactionAdder()
  const positionManager = useV3NFTPositionManagerContract()
  const burn = useCallback(async () => {
    setAttemptingTxn(true)
    if (
      !positionManager ||
      !liquidityValue0 ||
      !liquidityValue1 ||
      !deadline ||
      !account ||
      !chainId ||
      !feeValue0 ||
      !feeValue1 ||
      !positionSDK ||
      !liquidityPercentage ||
      !library
    ) {
      return
    }

    const { calldata, value } = NonfungiblePositionManager.removeCallParameters(positionSDK, {
      tokenId: tokenId.toString(),
      liquidityPercentage,
      slippageTolerance: allowedSlippage,
      deadline: deadline.toString(),
      collectOptions: {
        expectedCurrencyOwed0: feeValue0,
        expectedCurrencyOwed1: feeValue1,
        recipient: account,
      },
    })

    const txn = {
      to: positionManager.address,
      data: calldata,
      value,
    }

    library
      .getSigner()
      .estimateGas(txn)
      .then((estimate) => {
        const newTxn = {
          ...txn,
          gasLimit: calculateGasMargin(estimate),
        }

        return library
          .getSigner()
          .sendTransaction(newTxn)
          .then((response: TransactionResponse) => {
            setTxnHash(response.hash)
            setAttemptingTxn(false)
            addTransaction(response, {
              summary: `Remove ${liquidityValue0.currency.symbol}/${liquidityValue1.currency.symbol} V3 liquidity`,
            })
          })
      })
      .catch((error) => {
        setAttemptingTxn(false)
        console.error(error)
      })
  }, [
    tokenId,
    liquidityValue0,
    liquidityValue1,
    deadline,
    allowedSlippage,
    account,
    addTransaction,
    positionManager,
    chainId,
    feeValue0,
    feeValue1,
    library,
    liquidityPercentage,
    positionSDK,
  ])

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txnHash) {
      onPercentSelectForSlider(0)
    }
    setAttemptingTxn(false)
    setTxnHash('')
  }, [onPercentSelectForSlider, txnHash])

  const pendingText = `Removing ${liquidityValue0?.toSignificant(6)} ${
    liquidityValue0?.currency?.symbol
  } and ${liquidityValue1?.toSignificant(6)} ${liquidityValue1?.currency?.symbol}`

  function modalHeader() {
    return (
      <AutoColumn gap={'sm'} style={{ padding: '16px' }}>
        <RowBetween align="flex-end">
          <Text fontSize={16} fontWeight={500}>
            Pooled {liquidityValue0?.currency?.symbol}:
          </Text>
          <RowFixed>
            <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
              {liquidityValue0 && <FormattedCurrencyAmount currencyAmount={liquidityValue0} />}
            </Text>
            <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={liquidityValue0?.currency} />
          </RowFixed>
        </RowBetween>
        <RowBetween align="flex-end">
          <Text fontSize={16} fontWeight={500}>
            Pooled {liquidityValue1?.currency?.symbol}:
          </Text>
          <RowFixed>
            <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
              {liquidityValue1 && <FormattedCurrencyAmount currencyAmount={liquidityValue1} />}
            </Text>
            <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={liquidityValue1?.currency} />
          </RowFixed>
        </RowBetween>
        {feeValue0?.greaterThan(0) || feeValue1?.greaterThan(0) ? (
          <>
            <TYPE.italic fontSize={12} color={theme.text2} textAlign="left" padding={'8px 0 0 0'}>
              {`You will also collect fees earned from this position.`}
            </TYPE.italic>
            <RowBetween>
              <Text fontSize={16} fontWeight={500}>
                {feeValue0?.currency?.symbol} Fees Earned:
              </Text>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {feeValue0 && <FormattedCurrencyAmount currencyAmount={feeValue0} />}
                </Text>
                <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={feeValue0?.currency} />
              </RowFixed>
            </RowBetween>
            <RowBetween>
              <Text fontSize={16} fontWeight={500}>
                {feeValue1?.currency?.symbol} Fees Earned:
              </Text>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {feeValue1 && <FormattedCurrencyAmount currencyAmount={feeValue1} />}
                </Text>
                <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={feeValue1?.currency} />
              </RowFixed>
            </RowBetween>
          </>
        ) : null}
        <ButtonPrimary mt="16px" onClick={burn}>
          Remove
        </ButtonPrimary>
      </AutoColumn>
    )
  }

  return (
    <AutoColumn>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txnHash ?? ''}
        content={() => (
          <ConfirmationModalContent
            title={'Remove Liquidity'}
            onDismiss={handleDismissConfirmation}
            topContent={modalHeader}
          />
        )}
        pendingText={pendingText}
      />
      <AppBody>
        <AddRemoveTabs
          creating={false}
          adding={false}
          positionID={tokenId.toString()}
          defaultSlippage={DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE}
        />
        <Wrapper>
          {position ? (
            <AutoColumn gap="lg">
              <RowBetween>
                <RowFixed>
                  <DoubleCurrencyLogo
                    currency0={feeValue0?.currency}
                    currency1={feeValue1?.currency}
                    size={20}
                    margin={true}
                  />
                  <TYPE.label
                    ml="10px"
                    fontSize="20px"
                  >{`${feeValue0?.currency?.symbol}/${feeValue1?.currency?.symbol}`}</TYPE.label>
                </RowFixed>
                <RangeBadge removed={removed} inRange={!outOfRange} />
              </RowBetween>
              <LightCard>
                <AutoColumn gap="md">
                  <TYPE.main fontWeight={400}>Amount</TYPE.main>
                  <RowBetween>
                    <ResponsiveHeaderText>{percentForSlider}%</ResponsiveHeaderText>
                    <AutoRow gap="4px" justify="flex-end">
                      <SmallMaxButton onClick={() => onPercentSelect(25)} width="20%">
                        25%
                      </SmallMaxButton>
                      <SmallMaxButton onClick={() => onPercentSelect(50)} width="20%">
                        50%
                      </SmallMaxButton>
                      <SmallMaxButton onClick={() => onPercentSelect(75)} width="20%">
                        75%
                      </SmallMaxButton>
                      <SmallMaxButton onClick={() => onPercentSelect(100)} width="20%">
                        Max
                      </SmallMaxButton>
                    </AutoRow>
                  </RowBetween>
                  <Slider value={percentForSlider} onChange={onPercentSelectForSlider} />
                </AutoColumn>
              </LightCard>
              <LightCard>
                <AutoColumn gap="md">
                  <RowBetween>
                    <Text fontSize={16} fontWeight={500}>
                      Pooled {liquidityValue0?.currency?.symbol}:
                    </Text>
                    <RowFixed>
                      <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                        {liquidityValue0 && <FormattedCurrencyAmount currencyAmount={liquidityValue0} />}
                      </Text>
                      <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={liquidityValue0?.currency} />
                    </RowFixed>
                  </RowBetween>
                  <RowBetween>
                    <Text fontSize={16} fontWeight={500}>
                      Pooled {liquidityValue1?.currency?.symbol}:
                    </Text>
                    <RowFixed>
                      <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                        {liquidityValue1 && <FormattedCurrencyAmount currencyAmount={liquidityValue1} />}
                      </Text>
                      <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={liquidityValue1?.currency} />
                    </RowFixed>
                  </RowBetween>
                  {feeValue0?.greaterThan(0) || feeValue1?.greaterThan(0) ? (
                    <>
                      <Break />
                      <RowBetween>
                        <Text fontSize={16} fontWeight={500}>
                          {feeValue0?.currency?.symbol} Fees Earned:
                        </Text>
                        <RowFixed>
                          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                            {feeValue0 && <FormattedCurrencyAmount currencyAmount={feeValue0} />}
                          </Text>
                          <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={feeValue0?.currency} />
                        </RowFixed>
                      </RowBetween>
                      <RowBetween>
                        <Text fontSize={16} fontWeight={500}>
                          {feeValue1?.currency?.symbol} Fees Earned:
                        </Text>
                        <RowFixed>
                          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                            {feeValue1 && <FormattedCurrencyAmount currencyAmount={feeValue1} />}
                          </Text>
                          <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={feeValue1?.currency} />
                        </RowFixed>
                      </RowBetween>
                    </>
                  ) : null}
                </AutoColumn>
              </LightCard>

              {liquidityValue0?.currency &&
              liquidityValue1?.currency &&
              (liquidityValue0.currency.isEther ||
                liquidityValue1.currency.isEther ||
                currencyEquals(unwrappedToken(liquidityValue0.currency as Token), ETHER) ||
                currencyEquals(unwrappedToken(liquidityValue1.currency as Token), ETHER)) ? (
                <RowBetween>
                  <TYPE.main>Collect as WETH</TYPE.main>
                  <Toggle
                    id="receive-as-weth"
                    isActive={receiveWETH}
                    toggle={() => setReceiveWETH((receiveWETH) => !receiveWETH)}
                  />
                </RowBetween>
              ) : null}

              <div style={{ display: 'flex' }}>
                <AutoColumn gap="12px" style={{ flex: '1' }}>
                  <ButtonConfirmed
                    confirmed={false}
                    disabled={removed || percent === 0 || !liquidityValue0}
                    onClick={() => setShowConfirm(true)}
                  >
                    {removed ? 'Inactive' : error ?? 'Remove'}
                  </ButtonConfirmed>
                </AutoColumn>
              </div>
            </AutoColumn>
          ) : (
            <Loader />
          )}
        </Wrapper>
      </AppBody>
    </AutoColumn>
  )
}
