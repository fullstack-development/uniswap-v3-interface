import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet } from 'react-native'
import { useAppDispatch, useAppTheme } from 'src/app/hooks'
import { OnboardingStackParamList } from 'src/app/navigation/types'
import FaceIcon from 'src/assets/icons/faceid.svg'
import { Button, ButtonEmphasis } from 'src/components-uds/Button/Button'
import { Box, Flex } from 'src/components/layout'
import { FaceIDWarningModal } from 'src/components/Settings/FaceIDWarningModal'
import { BiometricAuthenticationStatus, tryLocalAuthenticate } from 'src/features/biometrics'
import { biometricAuthenticationSuccessful } from 'src/features/biometrics/hooks'
import { setRequiredForTransactions } from 'src/features/biometrics/slice'
import { OnboardingScreen } from 'src/features/onboarding/OnboardingScreen'
import { ElementName } from 'src/features/telemetry/constants'
import { OnboardingScreens } from 'src/screens/Screens'
import { openSettings } from 'src/utils/linking'

type Props = NativeStackScreenProps<OnboardingStackParamList, OnboardingScreens.Security>

export function SecuritySetupScreen({ navigation, route: { params } }: Props) {
  const { t } = useTranslation()
  const theme = useAppTheme()
  const dispatch = useAppDispatch()

  const [showWarningModal, setShowWarningModal] = useState(false)

  const onMaybeLaterPressed = () => {
    setShowWarningModal(true)
  }

  const onPressNext = () => {
    setShowWarningModal(false)
    navigation.navigate({ name: OnboardingScreens.Outro, params, merge: true })
  }

  const onPressEnableSecurity = async () => {
    const authStatus = await tryLocalAuthenticate({
      disableDeviceFallback: true,
    })

    if (
      authStatus === BiometricAuthenticationStatus.Unsupported ||
      authStatus === BiometricAuthenticationStatus.MissingEnrollment
    ) {
      Alert.alert(t('Face ID is disabled'), t('To use Face ID, allow access in system settings'), [
        { text: t('Go to settings'), onPress: openSettings },
        {
          text: t('Not now'),
        },
      ])
    }

    if (biometricAuthenticationSuccessful(authStatus)) {
      dispatch(setRequiredForTransactions(true))
      onPressNext()
    }
  }

  return (
    <>
      {showWarningModal && (
        <FaceIDWarningModal
          onCancel={() => setShowWarningModal(false)}
          onClose={() => setShowWarningModal(false)}
          onConfirm={onPressNext}
        />
      )}
      <OnboardingScreen
        childrenGap="none"
        subtitle={t(
          'Make sure that you’re the only person who can access your app or make transactions by turning on Face ID.'
        )}
        title={t('Protect your wallet')}>
        <Flex centered grow>
          <Box borderColor="background3" borderRadius="xl" borderWidth={4} style={styles.faceView}>
            <FaceIcon color={theme.colors.textSecondary} height={58} width={58} />
          </Box>
        </Flex>

        <Button
          emphasis={ButtonEmphasis.Tertiary}
          label={t('Maybe later')}
          name={ElementName.Skip}
          onPress={onMaybeLaterPressed}
        />

        <Button
          label={t('Turn on Face ID')}
          name={ElementName.Enable}
          onPress={onPressEnableSecurity}
        />
      </OnboardingScreen>
    </>
  )
}

const styles = StyleSheet.create({
  faceView: {
    paddingBottom: 94,
    paddingHorizontal: 32,
    paddingTop: 70,
  },
})
