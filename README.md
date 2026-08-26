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
