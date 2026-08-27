import assert from 'node:assert/strict';
import test from 'node:test';

import { validateLogin, validateSignUp } from './validation.ts';

test('rechaza campos vacíos', () => {
  assert.deepEqual(validateLogin({ email: '', password: '' }), {
    email: 'Ingresa tu correo electrónico.',
    password: 'Ingresa tu contraseña.',
  });
});

test('rechaza correo inválido y contraseña corta', () => {
  assert.deepEqual(validateLogin({ email: 'sara', password: '123' }), {
    email: 'Ingresa un correo válido.',
    password: 'Debe tener al menos 6 caracteres.',
  });
});

test('acepta credenciales con formato válido', () => {
  assert.deepEqual(validateLogin({ email: ' sara@example.com ', password: '123456' }), {});
});

test('valida el registro y la confirmación de contraseña', () => {
  assert.deepEqual(validateSignUp({
    name: '', email: 'sara@example.com', password: '123456', confirmPassword: '654321',
  }), {
    name: 'Ingresa tu nombre.',
    confirmPassword: 'Las contraseñas no coinciden.',
  });
});
