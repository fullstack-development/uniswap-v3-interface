import { useFocusEffect } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TFunction } from 'i18next'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppTheme } from 'src/app/hooks'
import { OnboardingStackParamList } from 'src/app/navigation/types'
import CloudIcon from 'src/assets/icons/cloud.svg'
import EyeIcon from 'src/assets/icons/eye.svg'
import SeedPhraseIcon from 'src/assets/icons/pencil.svg'
import { BackButton } from 'src/components/buttons/BackButton'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { Chevron } from 'src/components/icons/Chevron'
import { Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { useCloudBackups } from 'src/features/CloudBackup/hooks'
import {
  isICloudAvailable,
  startFetchingICloudBackups,
  stopFetchingICloudBackups,
} from 'src/features/CloudBackup/RNICloudBackupsManager'
import { importAccountActions } from 'src/features/import/importAccountSaga'
import { ImportAccountType } from 'src/features/import/types'
import { OnboardingScreen } from 'src/features/onboarding/OnboardingScreen'
import { ImportType, OnboardingEntryPoint } from 'src/features/onboarding/utils'
import { ElementName } from 'src/features/telemetry/constants'
import { Account, AccountType } from 'src/features/wallet/accounts/types'
import { useAccounts, usePendingAccounts } from 'src/features/wallet/hooks'
import {
  PendingAccountActions,
  pendingAccountActions,
} from 'src/features/wallet/pendingAcccountsSaga'
import { OnboardingScreens } from 'src/screens/Screens'
import { Theme } from 'src/styles/theme'

interface ImportMethodOption {
  title: (t: TFunction) => string
  blurb: (t: TFunction) => string
  icon: (theme: Theme) => React.ReactNode
  nav: any
  importType: ImportType
  name: ElementName
}

const options: ImportMethodOption[] = [
  {
    title: (t: TFunction) => t('Import a recovery phrase'),
    blurb: (t: TFunction) => t('Enter, paste, or scan your words'),
    icon: (theme: Theme) => (
      <SeedPhraseIcon color={theme.colors.textPrimary} height={16} width={16} />
    ),
    nav: OnboardingScreens.SeedPhraseInput,
    importType: ImportType.SeedPhrase,
    name: ElementName.OnboardingImportSeedPhrase,
  },
  {
    title: (t: TFunction) => t('View-only'),
    blurb: (t: TFunction) => t('Enter an address or ENS name'),
    icon: (theme: Theme) => <EyeIcon color={theme.colors.textPrimary} height={16} width={16} />,
    nav: OnboardingScreens.WatchWallet,
    importType: ImportType.Watch,
    name: ElementName.OnboardingImportWatchedAccount,
  },
  {
    title: (t: TFunction) => t('Restore from iCloud'),
    blurb: (t: TFunction) => t('Recover a backed-up recovery phrase'),
    icon: (theme: Theme) => <CloudIcon color={theme.colors.textPrimary} height={16} width={16} />,
    nav: OnboardingScreens.RestoreCloudBackup,
    importType: ImportType.Restore,
    name: ElementName.OnboardingImportBackup,
  },
]

type Props = NativeStackScreenProps<OnboardingStackParamList, OnboardingScreens.ImportMethod>

export function ImportMethodScreen({ navigation, route: { params } }: Props) {
  const { t } = useTranslation()
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const cloudBackups = useCloudBackups()
  const entryPoint = params?.entryPoint

  const accounts = useAccounts()
  const pendingAccounts = usePendingAccounts()
  const initialViewOnlyWallets = useRef<Account[]>( // Hold onto reference of view-only wallets before importing more wallets
    Object.values(accounts).filter((a) => a.type === AccountType.Readonly)
  )

  useFocusEffect(() => {
    if (params?.importType !== ImportType.SeedPhrase) return

    /**
     * When we go back and exit onboarding, we re-add any initial view-only wallets
     * that were overwritten during the import flow. (Due to how our redux account store is setup,
     * with the key being the address, when the mnemonic version of the wallet is imported,
     * it overwrites the view-only wallet.)
     */

    const unmodifiedWalletCleanup = () => {
      if (!initialViewOnlyWallets.current) return
      const pendingAccountAddresses = Object.keys(pendingAccounts)
      for (const viewOnlyWallet of initialViewOnlyWallets.current) {
        if (pendingAccountAddresses.includes(viewOnlyWallet.address)) {
          dispatch(
            importAccountActions.trigger({
              type: ImportAccountType.Address,
              address: viewOnlyWallet.address,
            })
          )
          dispatch(pendingAccountActions.trigger(PendingAccountActions.ACTIVATE))
        }
      }
    }
    navigation.addListener('beforeRemove', unmodifiedWalletCleanup)
    return () => navigation.removeListener('beforeRemove', unmodifiedWalletCleanup)
  })

  useEffect(() => {
    const shouldRenderBackButton = navigation.getState().index === 0
    if (shouldRenderBackButton) {
      navigation.setOptions({
        headerLeft: () => <BackButton />,
      })
    }
  }, [navigation, theme.colors.textPrimary])

  useEffect(() => {
    async function fetchICloudBackups() {
      const available = await isICloudAvailable()
      if (available) {
        startFetchingICloudBackups()
      }
    }

    fetchICloudBackups()

    return () => {
      stopFetchingICloudBackups()
    }
  }, [])

  const handleOnPressRestoreBackup = async () => {
    // Handle multiple backups found by showing screen with list of backups
    if (cloudBackups.length > 1) {
      navigation.navigate({
        name: OnboardingScreens.RestoreCloudBackup,
        params: { importType: ImportType.Restore, entryPoint },
        merge: true,
      })
      return
    }

    // Handle one backup found with user password
    const backup = cloudBackups[0]
    navigation.navigate({
      name: OnboardingScreens.RestoreCloudBackupPassword,
      params: { importType: ImportType.Restore, entryPoint, mnemonicId: backup.mnemonicId },
      merge: true,
    })
  }

  const handleOnPress = (nav: OnboardingScreens, importType: ImportType) => {
    // Delete any pending accounts before entering flow.
    dispatch(pendingAccountActions.trigger(PendingAccountActions.DELETE))

    if (importType === ImportType.Restore) {
      handleOnPressRestoreBackup()
      return
    }

    navigation.navigate({
      name: nav,
      params: { importType, entryPoint },
      merge: true,
    })
  }

  const importOptions =
    entryPoint === OnboardingEntryPoint.Sidebar
      ? options.filter((option) => option.name !== ElementName.OnboardingImportWatchedAccount)
      : options

  return (
    <OnboardingScreen title={t('Choose how to add your wallet')}>
      <Flex grow gap="xs">
        {importOptions.map(({ title, blurb, icon, nav, importType, name }) => (
          <OptionCard
            key={'connection-option-' + title}
            blurb={blurb(t)}
            disabled={name === ElementName.OnboardingImportBackup && cloudBackups.length === 0}
            icon={icon(theme)}
            name={name}
            opacity={
              name === ElementName.OnboardingImportBackup && cloudBackups.length === 0 ? 0.4 : 1
            }
            title={title(t)}
            onPress={() => handleOnPress(nav, importType)}
          />
        ))}
      </Flex>
    </OnboardingScreen>
  )
}

function OptionCard({
  title,
  blurb,
  icon,
  onPress,
  name,
  disabled,
  opacity,
}: {
  title: string
  blurb: string
  icon: React.ReactNode
  onPress: () => void
  name: ElementName
  disabled?: boolean
  opacity?: number
}) {
  const theme = useAppTheme()
  return (
    <TouchableArea
      backgroundColor="background2"
      borderColor="backgroundOutline"
      borderRadius="lg"
      borderWidth={1}
      disabled={disabled}
      name={name}
      opacity={opacity}
      px="md"
      py="sm"
      testID={name}
      onPress={onPress}>
      <Flex row alignItems="center" gap="md" justifyContent="space-between">
        <Flex row alignItems="center" gap="md" justifyContent="flex-start">
          <Flex
            centered
            borderColor="accentBranded"
            borderRadius="md"
            borderWidth={1}
            height={32}
            padding="md"
            width={32}>
            {icon}
          </Flex>

          <Flex alignItems="flex-start" gap="xxxs" justifyContent="space-around">
            <Text variant="subheadSmall">{title}</Text>
            <Text color="textSecondary" variant="buttonLabelMicro">
              {blurb}
            </Text>
          </Flex>
        </Flex>
        <Chevron color={theme.colors.textSecondary} direction="e" height={24} width={24} />
      </Flex>
    </TouchableArea>
  )
}
