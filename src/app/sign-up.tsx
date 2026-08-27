import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, deleteUser, signOut, updateProfile, type UserCredential } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { colors, radius, spacing, typography } from '@/constants/design-tokens';
import { getAuthErrorMessage } from '@/features/auth/auth-errors';
import { useAuth } from '@/features/auth/auth-context';
import { validateSignUp, type SignUpErrors } from '@/features/auth/validation';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { AvatarPicker } from '@/components/avatar-picker';
import { getRandomAvatarSymbol } from '@/constants/avatar-symbols';

export default function SignUpScreen() {
  const { isInitializing, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarSymbol, setAvatarSymbol] = useState(getRandomAvatarSymbol);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitError, setSubmitError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    const values = { name, email, password, confirmPassword };
    const nextErrors = validateSignUp(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!isFirebaseConfigured) {
      setSubmitError('Firebase aún no está configurado en este entorno.');
      return;
    }

    setSubmitError(undefined);
    setIsSubmitting(true);
    let credential: UserCredential | undefined;

    try {
      credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });
      await setDoc(doc(db, 'users', credential.user.uid), {
        displayName: name.trim(),
        email: credential.user.email,
        avatarSymbol,
        createdAt: serverTimestamp(),
      });
      router.replace('/home');
    } catch (error) {
      if (credential) {
        try {
          await deleteUser(credential.user);
        } catch {
          await signOut(auth);
        }
      }

      const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : undefined;
      setSubmitError(getAuthErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (
    label: string,
    value: string,
    onChangeText: (value: string) => void,
    error?: string,
    secureTextEntry = false,
  ) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize={label === 'Nombre' ? 'words' : 'none'}
        autoComplete={label === 'Correo electrónico' ? 'email' : secureTextEntry ? 'new-password' : 'name'}
        inputMode={label === 'Correo electrónico' ? 'email' : 'text'}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        style={[styles.input, error && styles.inputError]}
        value={value}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  if (!isInitializing && user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.description}>Guarda tus lotes y continúa tus procesos desde cualquier dispositivo.</Text>
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Elige tu símbolo</Text>
              <Text style={styles.avatarHint}>Podrás cambiarlo después desde el menú.</Text>
              <AvatarPicker disabled={isSubmitting} onChange={setAvatarSymbol} value={avatarSymbol} />
            </View>
            {field('Nombre', name, setName, errors.name)}
            {field('Correo electrónico', email, setEmail, errors.email)}
            {field('Contraseña', password, setPassword, errors.password, true)}
            {field('Confirmar contraseña', confirmPassword, setConfirmPassword, errors.confirmPassword, true)}
            {submitError && <Text accessibilityRole="alert" style={styles.submitError}>{submitError}</Text>}
            <Pressable accessibilityRole="button" disabled={isSubmitting || isInitializing} onPress={handleSignUp} style={({ pressed }) => [styles.button, pressed && styles.pressed, (isSubmitting || isInitializing) && styles.disabled]}>
              {isSubmitting ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>Crear cuenta</Text>}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.cream, flex: 1 }, keyboardView: { flex: 1 }, content: { flexGrow: 1, padding: spacing.xl },
  back: { color: colors.coffee, fontFamily: typography.family, fontSize: 16, fontWeight: typography.semiBold, marginBottom: spacing.xl },
  title: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 30, fontWeight: typography.extraBold },
  description: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 14, lineHeight: 21, marginTop: spacing.sm }, form: { gap: spacing.md, marginTop: spacing.xl },
  fieldGroup: { gap: spacing.xs }, label: { color: colors.darkBrown, fontFamily: typography.family, fontSize: 14, fontWeight: typography.bold },
  avatarHint: { color: colors.muted, fontFamily: typography.family, fontSize: 12, marginBottom: spacing.xs },
  input: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.darkBrown, fontFamily: typography.family, fontSize: 15, minHeight: 52, paddingHorizontal: spacing.md },
  inputError: { borderColor: colors.error }, errorText: { color: colors.error, fontFamily: typography.family, fontSize: 12 }, submitError: { color: colors.error, fontFamily: typography.family, fontSize: 13, lineHeight: 18, textAlign: 'center' },
  button: { alignItems: 'center', backgroundColor: colors.coffee, borderRadius: radius.md, justifyContent: 'center', minHeight: 52, marginTop: spacing.sm },
  buttonText: { color: colors.white, fontFamily: typography.family, fontSize: 17, fontWeight: typography.bold }, pressed: { opacity: 0.82 }, disabled: { opacity: 0.65 },
});
