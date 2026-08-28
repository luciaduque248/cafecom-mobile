import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/app-typography';
import { avatarSymbols, type AvatarSymbol } from '@/constants/avatar-symbols';
import { colors, radius, spacing, typography } from '@/constants/design-tokens';

type AvatarPickerProps = {
  disabled?: boolean;
  onChange: (symbol: AvatarSymbol) => void;
  value: AvatarSymbol;
};

export function AvatarPicker({ disabled = false, onChange, value }: AvatarPickerProps) {
  return (
    <View accessibilityRole="radiogroup" style={styles.options}>
      {avatarSymbols.map((symbol) => {
        const isSelected = symbol === value;
        return (
          <Pressable
            accessibilityLabel={`Avatar ${symbol}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected, disabled }}
            disabled={disabled}
            key={symbol}
            onPress={() => onChange(symbol)}
            style={({ pressed }) => [
              styles.option,
              isSelected && styles.selected,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.symbol}>{symbol}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  option: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  selected: { backgroundColor: '#FFF0E2', borderColor: colors.coffee, borderWidth: 2 },
  symbol: { fontFamily: typography.family, fontSize: 24 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
});
