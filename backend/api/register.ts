import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateToken, hashPassword } from "./auth";
import { sql } from "./db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { email, password } = body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const exists = await sql`
      SELECT id FROM users WHERE email=${email} LIMIT 1
    `;

    if (exists.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await hashPassword(password);

    const rows = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashed})
      RETURNING id, email
    `;

    const user = rows[0];
    const token = generateToken(user.id);

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
