import pool from "../db.js";
import express from "express";

const router = express.Router();

// get todos
router.get("/getTodos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create todo
router.post('/createTodo', async (req, res) => {
  const { task_name, status } = req.body;

  if (!task_name) {
    return res.status(400).json({ message: "task name is required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO todos (task_name, status) VALUES (?, ?)",
      [task_name, status]
    );

    res.json({ id: result.insertId, task_name, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update todo
router.put('/updateTodo/:id', async (req, res) => {
  const { id } = req.params;
  const { task_name, status } = req.body;

  try {
    await pool.query("UPDATE todos SET task_name=?, status=? WHERE id=?",
      [task_name, status, id,]
    );
    res.json({ message: "todo updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete todo
router.delete('/deleteTodo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todos WHERE id=?", [id]);
    res.json({ message: "todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
