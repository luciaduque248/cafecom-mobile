export function getAuthErrorMessage(code?: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Correo o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este correo.';
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Revisa tu conexión a internet e intenta nuevamente.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento antes de continuar.';
    case 'auth/operation-not-allowed':
      return 'El acceso por correo todavía no está habilitado.';
    case 'auth/invalid-api-key':
      return 'La configuración de Firebase no es válida.';
    default:
      return 'No fue posible completar la solicitud. Intenta nuevamente.';
  }
}
