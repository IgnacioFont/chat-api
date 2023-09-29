import User from "../models/user.js";
import userSchema from "../schemas/user.js";
import { Request, Response } from "express";

/**
 * Creates a user
 */
async function createUser(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;
    const result = userSchema.safeParse({ username, password });

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const userId = await User.create(username, password);

    return res.status(200).json({ id: userId });
  } catch (error: any) {
    return res.status(error.status).json({ error: error.message });
  }
}

export default createUser;
