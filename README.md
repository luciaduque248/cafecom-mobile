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
