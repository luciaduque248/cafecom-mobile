import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { colors } from '@/constants/design-tokens';

const logoSource = require('../../assets/images/logo_cafecom.png');

type BrandLogoProps = {
  height?: number;
  width?: number;
};

export function BrandLogo({ height = 144, width = 134 }: BrandLogoProps) {
  return (
    <Image
      accessibilityLabel="CaféCom"
      contentFit="contain"
      source={logoSource}
      style={{ height, width }}
      transition={180}
    />
  );
}

type AnimatedBrandSplashProps = {
  onFinish: () => void;
};

export function AnimatedBrandSplash({ onFinish }: AnimatedBrandSplashProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.86)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { duration: 380, toValue: 1, useNativeDriver: true }),
        Animated.spring(scale, { damping: 13, mass: 0.7, stiffness: 120, toValue: 1, useNativeDriver: true }),
      ]),
      Animated.delay(280),
      Animated.timing(opacity, { duration: 220, toValue: 0, useNativeDriver: true }),
    ]);

    animation.start(({ finished }) => {
      if (finished) onFinish();
    });

    return () => animation.stop();
  }, [onFinish, opacity, scale]);

  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.splash}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <BrandLogo height={192} width={178} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: { alignItems: 'center', backgroundColor: colors.cream, flex: 1, justifyContent: 'center' },
});
