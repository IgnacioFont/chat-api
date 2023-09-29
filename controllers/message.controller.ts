import messageModel from "../models/message";
import { sendMessageSchema, getMessagesSchema } from "../schemas/message.js";
import { Request, Response } from "express";

export async function sendMessage(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { sender, recipient, content } = req.body;
    const result = sendMessageSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = `Invalid request body. Details: ${result.error.issues.map((issue) => issue.message).join(", ")}`;
      return res.status(400).json({ error: errorMessage });
    }

    const message = await messageModel.sendMessage(sender, recipient, content);

    return res.status(200).json(message);
  } catch (error: any) {
    return res.status(error.status).json({ status: 500, error: error.message });
  }
}

export async function getMessages(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const result = getMessagesSchema.safeParse(req.query);


    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    const { recipient, start, limit } = req.query;

    const messages = await messageModel.getMessages(recipient, start, limit);

    return res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(error.status).json({ error: error.message });
  }
}
