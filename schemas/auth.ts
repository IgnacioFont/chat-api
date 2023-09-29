import { z } from "zod";

const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default authSchema;