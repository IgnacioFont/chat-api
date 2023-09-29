import authModel from "../models/auth";
import authSchema from "../schemas/auth";
import { Request, Response } from "express";

/**
 * Login allows the user to authenticate with credentials
 * and get a token to use on secured endpoints.
 */
async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;
    const result = authSchema.safeParse({ username, password });

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const authResult: { userId: number; token: string } | null =
      await authModel.authenticateUser(username, password);

    if (!authResult) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ id: authResult.userId, token: authResult.token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default login;
