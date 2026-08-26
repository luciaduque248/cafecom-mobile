import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { colors, radius, spacing, typography } from '@/constants/design-tokens';
import { validateLogin } from '@/features/auth/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <View style={styles.brandArea}>
          <View style={styles.logoCircle} accessibilityElementsHidden><Text style={styles.logoMark}>☕</Text></View>
          <Text style={styles.brand}>CaféCom</Text>
          <Text style={styles.tagline}>Tu guía práctica para mejorar la calidad del café</Text>
        </View>
        <View style={styles.sheet}>
          <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
          <Text style={styles.description}>Ingresa tus datos para continuar con tus lotes y protocolos.</Text>
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <SymbolView name={{ ios: 'envelope', android: 'mail' }} size={20} tintColor={colors.coffee} />
                <TextInput accessibilityLabel="Correo electrónico" autoCapitalize="none" autoComplete="email" inputMode="email" onChangeText={setEmail} placeholder="nombre@correo.com" placeholderTextColor={colors.muted} returnKeyType="next" style={styles.input} value={email} />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <SymbolView name={{ ios: 'lock', android: 'lock' }} size={20} tintColor={colors.coffee} />
                <TextInput accessibilityLabel="Contraseña" autoComplete="current-password" onChangeText={setPassword} onSubmitEditing={handleLogin} placeholder="Mínimo 6 caracteres" placeholderTextColor={colors.muted} returnKeyType="done" secureTextEntry style={styles.input} value={password} />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleLogin} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, isSubmitting && styles.disabled]}>
              {isSubmitting ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryButtonText}>Ingresar</Text>}
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => {}} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Crear una cuenta</Text></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream }, keyboardView: { flex: 1, justifyContent: 'flex-end' },
  brandArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, minHeight: 255 },
  logoCircle: { width: 108, height: 108, borderRadius: 54, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: colors.darkBrown, shadowOpacity: 0.08, shadowRadius: 16, elevation: 3 },
  logoMark: { fontSize: 54 }, brand: { marginTop: spacing.md, color: colors.darkBrown, fontSize: 26, fontWeight: typography.extraBold },
  tagline: { color: colors.darkBrown, fontSize: 13, lineHeight: 19, maxWidth: 300, marginTop: spacing.xs, textAlign: 'center' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: 42, borderTopRightRadius: 42, paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.xl },
  title: { color: colors.darkBrown, fontSize: 27, fontWeight: typography.extraBold, textAlign: 'center' },
  description: { color: colors.darkBrown, fontSize: 13, lineHeight: 19, marginTop: spacing.sm, textAlign: 'center' },
  form: { gap: spacing.md, marginTop: spacing.xl }, fieldGroup: { gap: spacing.xs }, label: { color: colors.darkBrown, fontSize: 14, fontWeight: typography.bold },
  inputContainer: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', minHeight: 52, paddingHorizontal: spacing.md },
  inputError: { borderColor: colors.error }, input: { color: colors.darkBrown, flex: 1, fontSize: 15, marginLeft: spacing.sm, paddingVertical: 12 }, errorText: { color: colors.error, fontSize: 12 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.coffee, borderRadius: radius.md, justifyContent: 'center', minHeight: 52, marginTop: spacing.sm }, primaryButtonText: { color: colors.white, fontSize: 17, fontWeight: typography.bold },
  secondaryButton: { alignItems: 'center', borderColor: colors.coffee, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 50 }, secondaryButtonText: { color: colors.coffee, fontSize: 16, fontWeight: typography.semiBold },
  pressed: { opacity: 0.82 }, disabled: { opacity: 0.65 },
});
