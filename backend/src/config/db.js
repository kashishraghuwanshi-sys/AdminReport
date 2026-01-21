import pkg from "pg";
const { Pool } = pkg;

// 🔥 DIRECT CONNECTION (NO .env)
const pool = new Pool({
  connectionString:
    "postgresql://postgres:Sup%40Base2025%21@db.jgerrrapcqqcchdktfnt.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

export const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB CONNECTED:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
  }
};

export { pool };
