import assert from 'node:assert/strict';
import test from 'node:test';

import { avatarSymbols, getAvatarSymbolForUser, isAvatarSymbol } from './avatar-symbols.ts';

test('asigna siempre el mismo símbolo al mismo usuario', () => {
  assert.equal(getAvatarSymbolForUser('usuario-123'), getAvatarSymbolForUser('usuario-123'));
});

test('el símbolo derivado pertenece a las opciones permitidas', () => {
  assert.ok(avatarSymbols.includes(getAvatarSymbolForUser('usuario-456')));
});

test('rechaza símbolos no permitidos recibidos desde Firestore', () => {
  assert.equal(isAvatarSymbol('☕'), true);
  assert.equal(isAvatarSymbol('🚫'), false);
  assert.equal(isAvatarSymbol(undefined), false);
});
