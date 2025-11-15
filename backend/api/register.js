const bcrypt = require("bcryptjs");
const pool = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Missing username or password" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, hashed]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    if (err.code === "23505") {
      res.status(400).json({ error: "Username already taken" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
