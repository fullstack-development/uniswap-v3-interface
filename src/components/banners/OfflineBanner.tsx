import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useAppTheme } from 'src/app/hooks'
import InfoCircle from 'src/assets/icons/info-circle.svg'
import { TabsAwareBottomBanner } from 'src/components/banners/TabsAwareBottomBanner'
import { selectModalsState } from 'src/features/modals/modalSlice'
import { selectFinishedOnboarding } from 'src/features/wallet/selectors'

export function OfflineBanner() {
  const { t } = useTranslation()
  const theme = useAppTheme()
  const netInfo = useNetInfo()

  // don't show the offline banner in onboarding
  const finishedOnboarding = useAppSelector(selectFinishedOnboarding)
  const modalStates = useAppSelector(selectModalsState)
  const isModalOpen = Object.values(modalStates).some((state) => state.isOpen)

  // Needs to explicity check for false since `netInfo.isConnected` may be null
  const showBanner = netInfo.isConnected === false && finishedOnboarding && !isModalOpen

  if (__DEV__) {
    // do not check in Dev mode since the simulator
    // gets funky with the network state:
    // https://github.com/react-native-netinfo/react-native-netinfo/issues/7
    return null
  }

  return showBanner ? (
    <TabsAwareBottomBanner
      icon={
        <InfoCircle
          color={theme.colors.textPrimary}
          height={theme.iconSizes.lg}
          width={theme.iconSizes.lg}
        />
      }
      text={t('You are in offline mode')}
    />
  ) : null
}
