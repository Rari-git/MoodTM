import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserIdFromRequest } from "./auth";
import { sql } from "./db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const rows = await sql`
    SELECT id, email
    FROM users
    WHERE id=${userId}
  `;

  return res.json(rows[0]);
}
