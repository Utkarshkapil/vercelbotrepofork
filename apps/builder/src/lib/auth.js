import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY; // Replace with a secure secret key

export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

export function createToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}