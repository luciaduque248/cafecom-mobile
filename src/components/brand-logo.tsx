import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import cafecomSvg from '../../assets/images/cafecom.svg';
import { colors } from '@/constants/design-tokens';

const logoDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cafecomSvg)}`;

type BrandLogoProps = {
  height?: number;
  width?: number;
};

export function BrandLogo({ height = 144, width = 134 }: BrandLogoProps) {
  return (
    <Image
      accessibilityLabel="CaféCom"
      cachePolicy="memory"
      contentFit="contain"
      source={{ uri: logoDataUri }}
      style={{ height, width }}
    />
  );
}

type AnimatedBrandSplashProps = {
  onFinish: () => void;
};

export function AnimatedBrandSplash({ onFinish }: AnimatedBrandSplashProps) {
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const dropOpacity = useRef(new Animated.Value(0)).current;
  const dropTranslateY = useRef(new Animated.Value(-88)).current;
  const dropScale = useRef(new Animated.Value(0.66)).current;
  const dropRotate = useRef(new Animated.Value(-10)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const rippleScale = useRef(new Animated.Value(0.28)).current;
  const secondRippleOpacity = useRef(new Animated.Value(0)).current;
  const secondRippleScale = useRef(new Animated.Value(0.35)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;
  const logoTranslateY = useRef(new Animated.Value(10)).current;
  const logoRotate = useRef(new Animated.Value(-2)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(dropOpacity, {
          duration: 130,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropScale, {
          duration: 210,
          easing: Easing.out(Easing.back(1.15)),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropRotate, {
          duration: 560,
          easing: Easing.inOut(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(dropTranslateY, {
          duration: 560,
          easing: Easing.in(Easing.cubic),
          toValue: 78,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dropOpacity, {
          duration: 80,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(rippleOpacity, {
            duration: 55,
            toValue: 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            duration: 350,
            easing: Easing.out(Easing.quad),
            toValue: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rippleScale, {
          duration: 405,
          easing: Easing.out(Easing.cubic),
          toValue: 2.05,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(70),
          Animated.parallel([
            Animated.sequence([
              Animated.timing(secondRippleOpacity, {
                duration: 45,
                toValue: 0.26,
                useNativeDriver: true,
              }),
              Animated.timing(secondRippleOpacity, {
                duration: 300,
                easing: Easing.out(Easing.quad),
                toValue: 0,
                useNativeDriver: true,
              }),
            ]),
            Animated.timing(secondRippleScale, {
              duration: 345,
              easing: Easing.out(Easing.cubic),
              toValue: 2.35,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.timing(logoOpacity, {
          duration: 190,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          duration: 280,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          damping: 8,
          mass: 0.68,
          stiffness: 150,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(420),
      Animated.timing(splashOpacity, {
        duration: 250,
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
    dropRotate,
    dropScale,
    dropTranslateY,
    logoOpacity,
    logoRotate,
    logoScale,
    logoTranslateY,
    onFinish,
    rippleOpacity,
    rippleScale,
    secondRippleOpacity,
    secondRippleScale,
    splashOpacity,
  ]);

  const dropRotation = dropRotate.interpolate({
    inputRange: [-10, 0],
    outputRange: ['-10deg', '0deg'],
  });
  const logoRotation = logoRotate.interpolate({
    inputRange: [-2, 0],
    outputRange: ['-2deg', '0deg'],
  });

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
            styles.secondRipple,
            {
              opacity: secondRippleOpacity,
              transform: [{ scale: secondRippleScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [
                { translateY: logoTranslateY },
                { scale: logoScale },
                { rotate: logoRotation },
              ],
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
              transform: [
                { translateY: dropTranslateY },
                { scale: dropScale },
                { rotate: dropRotation },
              ],
            },
          ]}
        >
          <View style={styles.drop}>
            <View style={styles.dropHighlight} />
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drop: {
    backgroundColor: colors.coffee,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    height: 31,
    overflow: 'hidden',
    transform: [{ rotate: '45deg' }],
    width: 31,
  },
  dropHighlight: {
    backgroundColor: colors.orange,
    borderRadius: 8,
    height: 10,
    left: 5,
    opacity: 0.58,
    position: 'absolute',
    top: 4,
    width: 7,
  },
  dropMotion: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 6,
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
  secondRipple: {
    borderColor: colors.orange,
    borderRadius: 34,
    borderWidth: 1.5,
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
