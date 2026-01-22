import { pool } from "../config/db.js";

export const getUsersByType = async (req, res) => {
  try {
    const { type = "all" } = req.query;

    let filter = "";
    if (type === "Approve") filter = "AND u.status = 'approved'";
    if (type === "On Hold") filter = "AND u.status = 'hold'";

    const query = `
      SELECT
        u.id,
        COALESCE(p.first_name, 'N/A') AS name,
        u.email,
        p.age,
        p.profession,
        u.status
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      WHERE 1=1 ${filter}
      ORDER BY u.id DESC
    `;

    const result = await pool.query(query);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
