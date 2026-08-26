# CaféCom Mobile

Aplicación móvil multiplataforma para acompañar a caficultores con protocolos, gestión de lotes y comunidad. La primera entrega implementa inicio de sesión y Home a partir del prototipo de Figma.

## Stack

- Expo SDK 57 + React Native + TypeScript
- Expo Router
- Diseño accesible y adaptable para Android e iOS

## Ejecutar

```bash
npm install
npm run android
```

## Verificación

```bash
npm run lint
npx tsc --noEmit
```

La validación y navegación están implementadas. La sesión remota queda pendiente hasta definir el backend; no se almacenan contraseñas localmente.

## Supabase

1. Copia `.env.example` como `.env` y completa la URL y publishable key.
2. Ejecuta la migración de `supabase/migrations` desde Supabase SQL Editor o CLI.
3. Añade `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` como GitHub Actions secrets.
4. Ejecuta manualmente el workflow `Supabase health check` para validar la conexión.

La aplicación persiste la sesión con AsyncStorage y delega las contraseñas a Supabase Auth. El workflow consulta una fila de salud cada tres días; no modifica datos de negocio ni expone claves en el repositorio.
