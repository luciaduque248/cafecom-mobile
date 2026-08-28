import { StyleSheet, Text as NativeText, TextInput as NativeTextInput, type TextInputProps, type TextProps } from 'react-native';

import { typography } from '@/constants/design-tokens';

export function AppText({ style, ...props }: TextProps) {
  return <NativeText {...props} style={[styles.montserrat, style]} />;
}

export function AppTextInput({ style, ...props }: TextInputProps) {
  return <NativeTextInput {...props} style={[styles.montserrat, style]} />;
}

const styles = StyleSheet.create({
  montserrat: {
    fontFamily: typography.family,
  },
});
