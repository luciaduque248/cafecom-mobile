# CaféCom Mobile

Aplicación móvil multiplataforma para acompañar a caficultores con protocolos, gestión de lotes y comunidad. La primera entrega implementa inicio de sesión y Home a partir del prototipo de Figma.

## Stack

- Expo SDK 57 + React Native + TypeScript
- Expo Router
- Firebase Authentication + Cloud Firestore
- Cloudinary para imágenes
- Diseño accesible y adaptable para Android e iOS

## Ejecutar

```bash
npm install
npm run android
```

## Android nativo y Android Studio

La carpeta `android/` forma parte del repositorio y contiene un proyecto Gradle
completo. En Android Studio selecciona **Open** y abre directamente la carpeta
`android`; el módulo ejecutable es `app` y el identificador es
`com.saraduque.cafecom`.

En Windows puedes regenerar la configuración nativa después de cambiar
`app.json` y compilar una APK de depuración con:

```powershell
npm run android:prebuild
npm run android:apk:windows
```

La APK queda en:

```text
android/app/build/outputs/apk/release/app-release.apk
```

También se genera sin Android Studio al publicar cambios Android en `main`, o
manualmente desde **GitHub → Actions → Build Android APK → Run workflow**. Al
terminar, la APK aparece como artefacto `cafecom-android-release` durante 14 días.

Para compilar, instalar y abrir la aplicación nativa en el emulador conectado:

```powershell
npm run android:native
```

El splash nativo se genera desde `assets/images/logo_cafecom.png` mediante la
configuración de `expo-splash-screen` en `app.json`.

## Verificación

```bash
npm test
npm run typecheck
npx expo export --platform android
```

La validación, registro, inicio/cierre de sesión y navegación protegida están implementados. Firebase gestiona las credenciales y la sesión se persiste mediante AsyncStorage.

## Configuración de Firebase

1. Copia `.env.example` como `.env` y completa la configuración pública de la app web de Firebase.
2. Activa Email/Password en Firebase Authentication.
3. Crea Firestore en modo producción.
4. Publica las reglas con `npx firebase-tools deploy --only firestore:rules`.
5. Reinicia Expo después de cambiar variables de entorno.

Las variables `EXPO_PUBLIC_*` se incorporan al bundle móvil: solo deben contener configuración pública. Nunca agregues credenciales administrativas ni claves de cuentas de servicio.

## Configuración de Cloudinary

Usa un upload preset **unsigned** restringido por formato, tamaño y carpeta, y completa las dos variables públicas de Cloudinary. La aplicación nunca debe incluir `API_SECRET`. Para producción se migrarán las cargas a firmas generadas por un backend.

## Seguridad de datos

Las reglas incluidas permiten que cada usuario autenticado cree y lea únicamente `users/{uid}`. Solo puede modificar su nombre; el correo y la fecha de creación permanecen inmutables. Cualquier otra colección queda bloqueada hasta que se diseñen reglas explícitas.
