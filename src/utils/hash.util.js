import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10; // 차후에 이거 constants 쪽으로 넣어버려

export function hashPassword(password) {
  const hash = bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

export async function comparePassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}
