export const avatarSymbols = ['☕', '🌱', '🍒', '🫘', '🌿', '⛰️'] as const;

export type AvatarSymbol = (typeof avatarSymbols)[number];

export function getRandomAvatarSymbol(): AvatarSymbol {
  return avatarSymbols[Math.floor(Math.random() * avatarSymbols.length)];
}

export function getAvatarSymbolForUser(userId: string): AvatarSymbol {
  let hash = 0;
  for (const character of userId) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return avatarSymbols[hash % avatarSymbols.length];
}

export function isAvatarSymbol(value: unknown): value is AvatarSymbol {
  return typeof value === 'string' && avatarSymbols.includes(value as AvatarSymbol);
}
