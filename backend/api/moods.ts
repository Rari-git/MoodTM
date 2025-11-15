import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserIdFromRequest } from "./auth";
import { sql } from "./db";

// Available moods (optional validation)
const VALID_MOODS = ["happy", "sad", "relaxed", "energetic", "angry"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // -------------------------
  // POST /api/moods – Create mood entry
  // -------------------------
  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const { mood, note } = body;

      if (!VALID_MOODS.includes(mood)) {
        return res.status(400).json({ message: "Invalid mood" });
      }

      const rows = await sql`
        INSERT INTO moods (user_id, mood, note)
        VALUES (${userId}, ${mood}, ${note || null})
        RETURNING id, mood, note, created_at
      `;

      return res.status(201).json(rows[0]);
    } catch (err) {
      console.error("MOOD CREATE ERROR:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // -------------------------
  // GET /api/moods – Get user moods
  // -------------------------
  if (req.method === "GET") {
    try {
      const rows = await sql`
        SELECT id, mood, note, created_at
        FROM moods
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;

      return res.status(200).json(rows);
    } catch (err) {
      console.error("MOOD GET ERROR:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
