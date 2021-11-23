import { SpacingProps, SpacingShorthandProps, useTheme } from '@shopify/restyle'
import React, { PropsWithChildren } from 'react'
import { Switch as BaseSwitch } from 'react-native'
import { Box } from 'src/components/layout/Box'
import { Theme } from 'src/styles/theme'

type RestyleProps = SpacingProps<Theme> & SpacingShorthandProps<Theme>

export type SwitchProps = {
  value: boolean
  onValueChange: (newValue: boolean) => void
  disabled?: boolean
} & RestyleProps

// A themed switch toggle
// TODO may need to replace with a custom switch implementation to match designs
export function Switch({
  value,
  onValueChange,
  disabled,
  ...rest
}: PropsWithChildren<SwitchProps>) {
  const theme = useTheme<Theme>()

  return (
    <Box {...rest}>
      <BaseSwitch
        trackColor={{ false: theme.colors.gray100, true: theme.colors.gray100 }}
        thumbColor={value ? theme.colors.blue : theme.colors.gray400}
        ios_backgroundColor={theme.colors.gray100}
        onValueChange={disabled ? undefined : onValueChange}
        value={value}
      />
    </Box>
  )
}
