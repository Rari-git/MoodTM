const bcrypt = require("bcryptjs");
const pool = require("../db");

function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: "Missing username" });
      return;
    }

    const result = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const newPassword = generatePassword();
    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [hashed, user.id]
    );

    res.status(200).json({
      message: "Password reset. Use the new password to login.",
      newPassword,
    });
  } catch (err) {
    console.error("FORGOT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
