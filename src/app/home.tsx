import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { colors, radius, spacing, typography } from '@/constants/design-tokens';

const actions = [
  { title: 'Protocolos', ios: 'book', android: 'menu_book', accent: '#FFF0E2' },
  { title: 'Asistente de voz', ios: 'mic', android: 'mic', accent: '#EAF5E8' },
  { title: 'Mis lotes', ios: 'archivebox', android: 'inventory_2', accent: '#F4E9DF' },
  { title: 'Información del café', ios: 'leaf', android: 'eco', accent: '#E9F2DF' },
  { title: 'Foro', ios: 'person.2', android: 'group', accent: '#FBECDD' },
  { title: 'Actualizaciones', ios: 'arrow.triangle.2.circlepath', android: 'sync', accent: '#EFE8F7' },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={styles.eyebrow}>BUENAS TARDES</Text><Text style={styles.title}>Menú</Text></View>
          <Pressable accessibilityLabel="Abrir perfil" accessibilityRole="button" style={styles.avatar}>
            <SymbolView name={{ ios: 'person.fill', android: 'person' }} size={25} tintColor={colors.coffee} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>
        <View style={styles.grid}>
          {actions.map((action) => (
            <Pressable accessibilityHint={`Abre ${action.title}`} accessibilityRole="button" key={action.title} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
              <View style={[styles.iconContainer, { backgroundColor: action.accent }]}>
                <SymbolView name={{ ios: action.ios, android: action.android }} size={31} tintColor={colors.coffee} />
              </View>
              <Text style={styles.cardTitle}>{action.title}</Text>
              <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right' }} size={18} tintColor={colors.orange} />
            </Pressable>
          ))}
        </View>
        <View style={styles.syncCard}>
          <View style={styles.syncIcon}><SymbolView name={{ ios: 'wifi', android: 'wifi' }} size={20} tintColor={colors.success} /></View>
          <View style={styles.syncCopy}><Text style={styles.syncLabel}>Última sincronización</Text><Text style={styles.syncTime}>Hace 5 min</Text></View>
          <SymbolView name={{ ios: 'checkmark.circle.fill', android: 'check_circle' }} size={22} tintColor={colors.success} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.cream, flex: 1 }, content: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.lg },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.lg },
  eyebrow: { color: colors.orange, fontSize: 11, fontWeight: typography.bold, letterSpacing: 1.4 }, title: { color: colors.darkBrown, fontSize: 32, fontWeight: typography.extraBold, marginTop: 2 },
  avatar: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 24, height: 48, justifyContent: 'center', width: 48 },
  subtitle: { color: colors.darkBrown, fontSize: 15, fontWeight: typography.semiBold, marginBottom: spacing.lg, marginTop: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  card: { alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, flexBasis: '48%', flexGrow: 1, gap: spacing.sm, justifyContent: 'center', minHeight: 154, padding: spacing.md, shadowColor: colors.darkBrown, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  iconContainer: { alignItems: 'center', borderRadius: 25, height: 50, justifyContent: 'center', width: 50 }, cardTitle: { color: colors.darkBrown, fontSize: 14, fontWeight: typography.bold, minHeight: 36, textAlign: 'center' }, pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] },
  syncCard: { alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, flexDirection: 'row', marginTop: spacing.lg, padding: spacing.md }, syncIcon: { alignItems: 'center', backgroundColor: '#EAF5E8', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 }, syncCopy: { flex: 1, marginLeft: spacing.md },
  syncLabel: { color: colors.darkBrown, fontSize: 13, fontWeight: typography.bold }, syncTime: { color: colors.muted, fontSize: 12, marginTop: 3 },
});
