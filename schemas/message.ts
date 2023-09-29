import { z } from "zod";

const contentSchema = {
  text: z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  image: z.object({
    type: z.literal("image"),
    url: z.string(),
    height: z.number(),
    width: z.number(),
  }),
  video: z.object({
    type: z.literal("video"),
    url: z.string(),
    source: z.enum(["youtube", "vimeo"]),
  }),
};

const sendMessageSchema = z.object({
  sender: z.number(),
  recipient: z.number(),
  content: z.union([contentSchema.text, contentSchema.image, contentSchema.video]),
});

const getMessagesSchema = z.object({
  recipient: z.number(),
  start: z.number(),
  limit: z.number().default(100),
});

export { sendMessageSchema, getMessagesSchema };