import assert from 'node:assert/strict';
import test from 'node:test';

import { getAuthErrorMessage } from './auth-errors.ts';

test('no expone mensajes internos de Firebase', () => {
  assert.equal(getAuthErrorMessage('auth/invalid-credential'), 'Correo o contraseña incorrectos.');
  assert.equal(getAuthErrorMessage('auth/internal-error'), 'No fue posible completar la solicitud. Intenta nuevamente.');
});
