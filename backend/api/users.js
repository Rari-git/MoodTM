const pool = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const result = await pool.query(
      "SELECT id, username, created_at FROM users ORDER BY id DESC"
    );
    res.status(200).json({ users: result.rows });
  } catch (err) {
    console.error("USERS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
