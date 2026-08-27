import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/features/auth/auth-context';
import { AnimatedBrandSplash } from '@/components/brand-logo';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Variable.ttf'),
  });
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const finishIntro = useCallback(() => setIsIntroVisible(false), []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) return null;
  if (isIntroVisible) return <AnimatedBrandSplash onFinish={finishIntro} />;

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </AuthProvider>
  );
}
