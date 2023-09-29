import healthModel from "../models/health.js";
import { Request, Response } from "express";

/**
 * Checks if the app is running fine, including the database check.
 */
async function checkHealth(req: Request, res: Response): Promise<void> {
  try {
    const isDatabaseRunning = await healthModel.checkDatabase();

    if (isDatabaseRunning) {
      res.json({ health: "ok" });
    } else {
      res.status(500).json({ health: "error" });
    }
  } catch (error) {
    res.status(500).json({ health: "error" });
  }
}

export default checkHealth;
