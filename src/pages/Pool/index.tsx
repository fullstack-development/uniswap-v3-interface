import React, { useContext } from 'react'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { SwapPoolTabs } from 'components/NavigationTabs'
import PositionList from 'components/PositionList'
import { RowBetween, RowFixed } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import { useV3Positions } from 'hooks/useV3Positions'
import { Inbox } from 'react-feather'
import { Link } from 'react-router-dom'
import { useWalletModalToggle } from 'state/application/hooks'
import styled, { ThemeContext } from 'styled-components'
import { HideSmall, TYPE } from 'theme'
import { LoadingRows } from './styleds'

const PageWrapper = styled(AutoColumn)`
  max-width: 870px;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`
const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`
const ButtonRow = styled(RowFixed)`
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  `};
`

const NoLiquidity = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`
const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  border-radius: 12px;
  padding: 6px 8px;
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 49%;
  `};
`

const MainContentWrapper = styled.main`
  background-color: ${({ theme }) => theme.bg0};
  padding: 8px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

export default function Pool() {
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const theme = useContext(ThemeContext)
  const { positions, loading: positionsLoading } = useV3Positions(account)

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader>Pools Overview</TYPE.mediumHeader>
              </HideSmall>
              <ButtonRow>
                <ResponsiveButtonPrimary id="join-pool-button" as={Link} to={'/add/POL'}>
                  + New Position
                </ResponsiveButtonPrimary>
              </ButtonRow>
            </TitleRow>
            <MainContentWrapper>
              {positionsLoading ? (
                <LoadingRows>
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </LoadingRows>
              ) : positions && positions.length > 0 ? (
                <PositionList positions={positions} />
              ) : (
                <NoLiquidity>
                  <TYPE.mediumHeader color={theme.text3} textAlign="center">
                    <Inbox size={48} strokeWidth={1} style={{ marginBottom: '.5rem' }} />
                    <div>Your liquidity positions will appear here.</div>
                  </TYPE.mediumHeader>
                  {!account && (
                    <ButtonPrimary style={{ marginTop: '2em', padding: '8px 16px' }} onClick={toggleWalletModal}>
                      Connect a wallet
                    </ButtonPrimary>
                  )}
                </NoLiquidity>
              )}
            </MainContentWrapper>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
