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

    const result = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      res.status(400).json({ error: "Wrong password" });
      return;
    }

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
