import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
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
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const dropOpacity = useRef(new Animated.Value(0)).current;
  const dropTranslateY = useRef(new Animated.Value(-72)).current;
  const dropScale = useRef(new Animated.Value(0.72)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const rippleScale = useRef(new Animated.Value(0.35)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const logoTranslateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(90),
      Animated.parallel([
        Animated.timing(dropOpacity, {
          duration: 110,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropScale, {
          duration: 180,
          easing: Easing.out(Easing.back(1.2)),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropTranslateY, {
          duration: 520,
          easing: Easing.in(Easing.cubic),
          toValue: 82,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dropOpacity, {
          duration: 85,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(rippleOpacity, {
            duration: 55,
            toValue: 0.42,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            duration: 330,
            easing: Easing.out(Easing.quad),
            toValue: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rippleScale, {
          duration: 385,
          easing: Easing.out(Easing.cubic),
          toValue: 2.15,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          duration: 180,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          duration: 260,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          damping: 9,
          mass: 0.7,
          stiffness: 145,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(340),
      Animated.timing(splashOpacity, {
        duration: 240,
        easing: Easing.inOut(Easing.quad),
        toValue: 0,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished) onFinish();
    });

    return () => animation.stop();
  }, [
    dropOpacity,
    dropScale,
    dropTranslateY,
    logoOpacity,
    logoScale,
    logoTranslateY,
    onFinish,
    rippleOpacity,
    rippleScale,
    splashOpacity,
  ]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.splash, { opacity: splashOpacity }]}
    >
      <View style={styles.stage}>
        <Animated.View
          style={[
            styles.ripple,
            {
              opacity: rippleOpacity,
              transform: [{ scale: rippleScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }, { scale: logoScale }],
            },
          ]}
        >
          <BrandLogo height={192} width={178} />
        </Animated.View>

        <Animated.View
          style={[
            styles.dropMotion,
            {
              opacity: dropOpacity,
              transform: [{ translateY: dropTranslateY }, { scale: dropScale }],
            },
          ]}
        >
          <View style={styles.drop} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drop: {
    backgroundColor: colors.coffee,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    height: 30,
    transform: [{ rotate: '45deg' }],
    width: 30,
  },
  dropMotion: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 8,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  ripple: {
    borderColor: colors.coffee,
    borderRadius: 34,
    borderWidth: 2,
    height: 68,
    position: 'absolute',
    width: 68,
  },
  splash: {
    alignItems: 'center',
    backgroundColor: colors.cream,
    flex: 1,
    justifyContent: 'center',
  },
  stage: {
    alignItems: 'center',
    height: 230,
    justifyContent: 'center',
    position: 'relative',
    width: 230,
  },
});
