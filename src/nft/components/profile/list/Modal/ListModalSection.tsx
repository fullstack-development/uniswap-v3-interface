import { Plural, Trans } from '@lingui/macro'
import Column from 'components/Column'
import { ScrollBarStyles } from 'components/Common'
import Row from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import {
  ChevronUpIcon,
  ListingModalWindowActive,
  ListingModalWindowClosed,
  LoadingIcon,
  VerifiedIcon,
} from 'nft/components/icons'
import { AssetRow, CollectionRow, ListingStatus } from 'nft/types'
import { useMemo } from 'react'
import { Check, Info, XOctagon } from 'react-feather'
import styled, { css, useTheme } from 'styled-components/macro'
import { ThemedText } from 'theme'
import { colors } from 'theme/colors'
import { TRANSITION_DURATIONS } from 'theme/styles'
import { opacify } from 'theme/utils'

const SectionHeader = styled(Row)`
  justify-content: space-between;
`

const SectionTitle = styled(ThemedText.SubHeader)<{ active: boolean; approved: boolean }>`
  line-height: 24px;
  color: ${({ theme, active, approved }) =>
    approved ? theme.accentSuccess : active ? theme.textPrimary : theme.textSecondary};
`

const SectionArrow = styled(ChevronUpIcon)<{ active: boolean }>`
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: ${TRANSITION_DURATIONS.medium}ms;
  transform: rotate(${({ active }) => (active ? 0 : 180)}deg);
`

const SectionBody = styled(Column)`
  border-left: 1.5px solid ${colors.gray650};
  margin-top: 4px;
  margin-left: 7px;
  padding-top: 4px;
  padding-left: 20px;
  max-height: 394px;
  overflow-y: auto;
  ${ScrollBarStyles}
`

const StyledInfoIcon = styled(Info)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.textSecondary};
`

const ContentRowContainer = styled(Column)`
  gap: 8px;
`

const ContentColumn = styled(Column)<{ failed: boolean }>`
  background-color: ${({ theme, failed }) => failed && opacify(12, theme.accentCritical)};
  border-radius: 12px;
  padding-bottom: 16px;
`

const ContentRow = styled(Row)<{ active: boolean; failed: boolean }>`
  padding: 16px;
  border: ${({ failed, theme }) => !failed && `1px solid ${theme.backgroundOutline}`};
  border-radius: 12px;
  opacity: ${({ active, failed }) => (active || failed ? '1' : '0.6')};
`

const CollectionIcon = styled.img`
  border-radius: 100px;
  height: 24px;
  width: 24px;
  z-index: 1;
`

const AssetIcon = styled.img`
  border-radius: 4px;
  height: 24px;
  width: 24px;
  z-index: 1;
`

const MarketplaceIcon = styled.img`
  border-radius: 4px;
  height: 24px;
  width: 24px;
  margin-left: -4px;
  margin-right: 12px;
`

const ContentName = styled(ThemedText.SubHeaderSmall)`
  color: ${({ theme }) => theme.textPrimary};
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 50%;
`

const ProceedText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.textSecondary};
`

const FailedText = styled.span`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.accentCritical};
  margin-left: 4px;
`

const StyledVerifiedIcon = styled(VerifiedIcon)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
`

const IconWrapper = styled.div`
  margin-left: auto;
  margin-right: 0px;
`

const ButtonRow = styled(Row)`
  padding: 0px 16px;
  justify-content: space-between;
`

const failedButtonStyle = css`
  width: 152px;
  cursor: pointer;
  padding: 8px 0px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  border-radius: 12px;
  border: none;

  &:hover {
    opacity: 0.6;
  }
`

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.accentCritical};
  color: ${({ theme }) => theme.accentTextDarkPrimary};
  ${failedButtonStyle}
`

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.backgroundInteractive};
  color: ${({ theme }) => theme.textPrimary};
  ${failedButtonStyle}
`

export const enum Section {
  APPROVE,
  SIGN,
}

interface ListModalSectionProps {
  sectionType: Section
  active: boolean
  content: AssetRow[]
  toggleSection: React.DispatchWithoutAction
}

export const ListModalSection = ({ sectionType, active, content, toggleSection }: ListModalSectionProps) => {
  const theme = useTheme()
  const allContentApproved = useMemo(() => !content.some((row) => row.status !== ListingStatus.APPROVED), [content])
  const isCollectionApprovalSection = sectionType === Section.APPROVE
  return (
    <Column>
      <SectionHeader>
        <Row>
          {active || allContentApproved ? (
            <ListingModalWindowActive fill={allContentApproved ? theme.accentSuccess : theme.accentAction} />
          ) : (
            <ListingModalWindowClosed />
          )}
          <SectionTitle active={active} marginLeft="12px" approved={allContentApproved}>
            {isCollectionApprovalSection ? (
              <>
                <Trans>Approve</Trans>&nbsp;{content.length}&nbsp;
                <Plural value={content.length} _1="Collection" other="Collections" />
              </>
            ) : (
              <>
                <Trans>Sign</Trans> &nbsp;{content.length}&nbsp;{' '}
                <Plural value={content.length} _1="Listing" other="Listings" />
              </>
            )}
          </SectionTitle>
        </Row>
        <SectionArrow
          active={active}
          secondaryColor={active ? theme.textPrimary : theme.textSecondary}
          onClick={toggleSection}
        />
      </SectionHeader>
      {active && (
        <SectionBody>
          {isCollectionApprovalSection && (
            <Row height="16px" marginBottom="16px">
              <ThemedText.Caption lineHeight="16px" color="textSecondary">
                <Trans>Why is a transaction required?</Trans>
              </ThemedText.Caption>
              <MouseoverTooltip
                text={<Trans>Listing an NFT requires a one-time marketplace approval for each NFT collection.</Trans>}
              >
                <StyledInfoIcon />
              </MouseoverTooltip>
            </Row>
          )}
          <ContentRowContainer>
            {content.map((row) => {
              const failed = row.status === ListingStatus.FAILED || row.status === ListingStatus.REJECTED
              return (
                <ContentColumn key={row.name} failed={failed}>
                  <ContentRow
                    active={row.status === ListingStatus.SIGNING || row.status === ListingStatus.APPROVED}
                    failed={failed}
                  >
                    {isCollectionApprovalSection ? (
                      <CollectionIcon src={row.images[0]} />
                    ) : (
                      <AssetIcon src={row.images[0]} />
                    )}
                    <MarketplaceIcon src={row.images[1]} />
                    <ContentName>{row.name}</ContentName>
                    {isCollectionApprovalSection && (row as CollectionRow).isVerified && <StyledVerifiedIcon />}
                    <IconWrapper>
                      {row.status === ListingStatus.DEFINED || row.status === ListingStatus.PENDING ? (
                        <LoadingIcon
                          height="14px"
                          width="14px"
                          stroke={row.status === ListingStatus.PENDING ? theme.accentAction : theme.textTertiary}
                        />
                      ) : row.status === ListingStatus.SIGNING ? (
                        <ProceedText>
                          <Trans>Proceed in wallet</Trans>
                        </ProceedText>
                      ) : row.status === ListingStatus.APPROVED ? (
                        <Check height="20" width="20" stroke={theme.accentSuccess} />
                      ) : (
                        (row.status === ListingStatus.FAILED || row.status === ListingStatus.REJECTED) && (
                          <Row>
                            <XOctagon height="20" width="20" color={theme.accentCritical} />
                            <FailedText>
                              {row.status === ListingStatus.FAILED ? <Trans>Failed</Trans> : <Trans>Rejected</Trans>}
                            </FailedText>
                          </Row>
                        )
                      )}
                    </IconWrapper>
                  </ContentRow>
                  {failed && (
                    <ButtonRow justify="space-between">
                      <RemoveButton>
                        <Trans>Remove</Trans>
                      </RemoveButton>
                      <RetryButton>
                        <Trans>Retry</Trans>
                      </RetryButton>
                    </ButtonRow>
                  )}
                </ContentColumn>
              )
            })}
          </ContentRowContainer>
        </SectionBody>
      )}
    </Column>
  )
}
