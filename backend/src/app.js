import express from "express";
import cors from "cors";
import reportRoutes from "./routes/report.routes.js";
import adminUsersRoutes from "./routes/adminUsers.routes.js";
import { pool } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      time: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/admin/reports", reportRoutes);
app.use("/api/admin/users/handle", adminUsersRoutes);

export default app;
