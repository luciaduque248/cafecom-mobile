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
    />
  );
}

type AnimatedBrandSplashProps = {
  onFinish: () => void;
};

export function AnimatedBrandSplash({ onFinish }: AnimatedBrandSplashProps) {
  const dropOpacity = useRef(new Animated.Value(0)).current;
  const dropTranslateY = useRef(new Animated.Value(-92)).current;
  const dropScale = useRef(new Animated.Value(0.72)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(120),
      Animated.parallel([
        Animated.timing(dropOpacity, {
          duration: 120,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropScale, {
          duration: 180,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dropTranslateY, {
          duration: 620,
          easing: Easing.in(Easing.cubic),
          toValue: 68,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(dropOpacity, {
        duration: 90,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.delay(240),
    ]);

    animation.start(({ finished }) => {
      if (finished) onFinish();
    });

    return () => animation.stop();
  }, [dropOpacity, dropScale, dropTranslateY, onFinish]);

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.splash}
    >
      <View style={styles.stage}>
        <BrandLogo height={192} width={178} />

        <Animated.View
          style={[
            styles.dropMotion,
            {
              opacity: dropOpacity,
              transform: [
                { translateY: dropTranslateY },
                { scale: dropScale },
              ],
            },
          ]}
        >
          <View style={styles.drop}>
            <View style={styles.dropHighlight} />
          </View>
        </Animated.View>
      </View>
    </View>
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
    top: 0,
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
