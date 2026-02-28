import { useSettingsStore } from '@/store/settingsStore';
import { useColorScheme as useReactNativeColorScheme } from 'react-native';

export function useColorScheme() {
    const { theme } = useSettingsStore();
    const systemTheme = useReactNativeColorScheme();

    if (theme === 'system') {
        return systemTheme;
    }
    return theme;
}
