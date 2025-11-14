import type { VercelRequest } from "@vercel/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-please-change";

// ----------------
// HASH PASSWORD
// ----------------
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// ----------------
// VERIFY PASSWORD
// ----------------
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// ----------------
// GENERATE TOKEN
// ----------------
export function generateToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

// ----------------
// VERIFY TOKEN FROM REQUEST HEADERS
// ----------------
export function getUserIdFromRequest(req: VercelRequest): number | null {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    return decoded.userId;
  } catch {
    return null;
  }
}
