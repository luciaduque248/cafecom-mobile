# CaféCom Mobile

Aplicación móvil multiplataforma para acompañar a caficultores con protocolos, gestión de lotes y comunidad.

## Stack

- Expo SDK 57 + React Native + TypeScript
- Expo Router
- Firebase Authentication
- Cloud Firestore
- Cloudinary para imágenes

## Ejecutar

```bash
npm install
npm run android
```

## Configuración local

1. Copia `.env.example` como `.env`.
2. Crea un proyecto en Firebase y registra una app Web para obtener el objeto de configuración.
3. Completa las variables `EXPO_PUBLIC_FIREBASE_*` en `.env`.
4. En Firebase Authentication habilita el proveedor Email/Password.
5. Crea la base de datos Cloud Firestore.
6. Publica las reglas de `firestore.rules` desde Firebase Console o Firebase CLI.
7. En Cloudinary crea un unsigned upload preset y completa `EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME` y `EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
8. Reinicia Expo después de cambiar variables de entorno.

## Seguridad

Las variables `EXPO_PUBLIC_*` forman parte del bundle cliente y no deben contener secretos. No agregues `CLOUDINARY_API_SECRET`, credenciales administrativas de Firebase ni service-account keys al proyecto móvil.

Las reglas iniciales de Firestore permiten a cada usuario autenticado leer y actualizar únicamente su documento `users/{uid}` y deniegan el resto por defecto. A medida que se creen lotes, protocolos y comunidad, deben añadirse reglas explícitas para cada colección.

Cloudinary se usa mediante un unsigned upload preset. El `api_secret` de Cloudinary nunca debe estar dentro de la aplicación.

## Servicios

- `src/lib/firebase.ts`: inicialización de Firebase, Authentication y Firestore.
- `src/lib/cloudinary.ts`: subida de imágenes a Cloudinary.

## Verificación

```bash
npm run lint
npm run typecheck
npm test
```
