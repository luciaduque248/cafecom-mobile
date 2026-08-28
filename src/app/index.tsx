import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { AppText as Text, AppTextInput as TextInput } from '@/components/app-typography';
import { colors, radius, spacing, typography } from '@/constants/design-tokens';
import { getAuthErrorMessage } from '@/features/auth/auth-errors';
import { useAuth } from '@/features/auth/auth-context';
import { validateLogin } from '@/features/auth/validation';
import { auth } from '@/lib/firebase';
import { BrandLogo } from '@/components/brand-logo';

export default function LoginScreen() {
  const { isConfigured, isInitializing, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const handleLogin = async () => {
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitError(undefined);
    if (!isConfigured) {
      setSubmitError('Firebase aún no está configurado en este entorno.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/home');
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : undefined;
      setSubmitError(getAuthErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isInitializing && user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <View style={styles.brandArea}>
          <BrandLogo />
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
                <TextInput accessibilityLabel="Correo electrónico" autoCapitalize="none" autoComplete="email" cursorColor={colors.coffee} inputMode="email" onChangeText={setEmail} placeholder="nombre@correo.com" placeholderTextColor={colors.muted} returnKeyType="next" selectionColor={colors.coffee} style={styles.input} value={email} />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <SymbolView name={{ ios: 'lock', android: 'lock' }} size={20} tintColor={colors.coffee} />
                <TextInput accessibilityLabel="Contraseña" autoComplete="current-password" cursorColor={colors.coffee} onChangeText={setPassword} onSubmitEditing={handleLogin} placeholder="Mínimo 6 caracteres" placeholderTextColor={colors.muted} returnKeyType="done" secureTextEntry selectionColor={colors.coffee} style={styles.input} value={password} />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <Pressable accessibilityRole="button" disabled={isSubmitting || isInitializing} onPress={handleLogin} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, (isSubmitting || isInitializing) && styles.disabled]}>
              {isSubmitting ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryButtonText}>Ingresar</Text>}
            </Pressable>
            {submitError && <Text accessibilityRole="alert" style={styles.submitError}>{submitError}</Text>}
            <Pressable accessibilityRole="button" onPress={() => router.push('/sign-up')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Crear una cuenta</Text></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream }, keyboardView: { flex: 1, justifyContent: 'flex-end' },
  brandArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, minHeight: 255 },
  tagline: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 13, lineHeight: 19, maxWidth: 300, marginTop: spacing.xs, textAlign: 'center' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: 42, borderTopRightRadius: 42, paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.xl },
  title: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 27, fontWeight: typography.extraBold, textAlign: 'center' },
  description: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 13, lineHeight: 19, marginTop: spacing.sm, textAlign: 'center' },
  form: { gap: spacing.md, marginTop: spacing.xl }, fieldGroup: { gap: spacing.xs }, label: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 14, fontWeight: typography.bold },
  inputContainer: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', minHeight: 52, paddingHorizontal: spacing.md },
  inputError: { borderColor: colors.error }, input: { color: colors.coffee, flex: 1, fontFamily: typography.family, fontSize: 15, fontWeight: typography.regular, marginLeft: spacing.sm, paddingVertical: 12 }, errorText: { color: colors.error, fontFamily: typography.family, fontSize: 12 },
  submitError: { color: colors.error, fontFamily: typography.family, fontSize: 13, lineHeight: 18, textAlign: 'center' },
  primaryButton: { alignItems: 'center', backgroundColor: colors.coffee, borderRadius: radius.md, justifyContent: 'center', minHeight: 52, marginTop: spacing.sm }, primaryButtonText: { color: colors.white, fontFamily: typography.family, fontSize: 17, fontWeight: typography.bold },
  secondaryButton: { alignItems: 'center', borderColor: colors.coffee, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 50 }, secondaryButtonText: { color: colors.coffee, fontFamily: typography.family, fontSize: 16, fontWeight: typography.semiBold },
  pressed: { opacity: 0.82 }, disabled: { opacity: 0.65 },
});
