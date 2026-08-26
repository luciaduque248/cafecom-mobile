export type LoginValues = { email: string; password: string };
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  const email = values.email.trim();
  if (!email) errors.email = 'Ingresa tu correo electrónico.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Ingresa un correo válido.';
  if (!values.password) errors.password = 'Ingresa tu contraseña.';
  else if (values.password.length < 6) errors.password = 'Debe tener al menos 6 caracteres.';
  return errors;
}
