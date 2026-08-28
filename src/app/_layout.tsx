import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedBrandSplash } from '@/components/brand-logo';
import { colors } from '@/constants/design-tokens';
import { AuthProvider } from '@/features/auth/auth-context';

void SplashScreen.preventAutoHideAsync();

const INTRO_FAILSAFE_MS = 2600;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Variable.ttf'),
  });
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const nativeSplashHidden = useRef(false);

  const hideNativeSplash = useCallback(() => {
    if (nativeSplashHidden.current) return;

    nativeSplashHidden.current = true;
    void SplashScreen.hideAsync().catch(() => {
      nativeSplashHidden.current = false;
    });
  }, []);

  const finishIntro = useCallback(() => {
    setIsIntroVisible(false);
  }, []);

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;

    const fallback = setTimeout(() => {
      hideNativeSplash();
      setIsIntroVisible(false);
    }, INTRO_FAILSAFE_MS);

    return () => clearTimeout(fallback);
  }, [fontError, fontsLoaded, hideNativeSplash]);

  if (!fontsLoaded && !fontError) return null;

  if (isIntroVisible) {
    return (
      <View onLayout={hideNativeSplash} style={styles.introHost}>
        <AnimatedBrandSplash onFinish={finishIntro} />
      </View>
    );
  }

  return (
    <View style={styles.appHost}>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appHost: {
    backgroundColor: colors.cream,
    flex: 1,
  },
  introHost: {
    backgroundColor: colors.cream,
    flex: 1,
  },
});
