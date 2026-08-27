export type LoginValues = { email: string; password: string };
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;
export type SignUpValues = LoginValues & { confirmPassword: string; name: string };
export type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

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

export function validateSignUp(values: SignUpValues): SignUpErrors {
  const errors: SignUpErrors = { ...validateLogin(values) };
  if (!values.name.trim()) errors.name = 'Ingresa tu nombre.';
  if (!values.confirmPassword) errors.confirmPassword = 'Confirma tu contraseña.';
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Las contraseñas no coinciden.';
  return errors;
}
