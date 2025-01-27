'use client'

import { useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import {
    createTheme,
    ThemeOptions,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

import { useSettingsContext } from 'src/components/settings'

// system
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

// options
import { customShadows } from './custom-shadows'
import { componentsOverrides } from './overrides'
import { createPresets } from './options/presets'
import NextAppDirEmotionCacheProvider from './next-emotion-cache'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const settings = useSettingsContext()

    const presets = createPresets(settings.themeColorPresets)

    const memoizedValue = useMemo(
        () => ({
            palette: {
                ...palette(settings.themeMode),
                ...presets.palette,
            },
            customShadows: {
                ...customShadows(settings.themeMode),
                ...presets.customShadows,
            },
            shadows: shadows(settings.themeMode),
            shape: { borderRadius: 8 },
            typography,
        }),
        [settings.themeMode, presets.palette, presets.customShadows]
    )

    const theme = createTheme(memoizedValue as ThemeOptions)

    theme.components = componentsOverrides(theme)

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </NextAppDirEmotionCacheProvider>
    )
}
