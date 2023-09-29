import express from "express";
import createUser from "./controllers/user.controller";
import checkHealth from "./controllers/health.controller";
import login from "./controllers/auth.controller";
import { sendMessage, getMessages } from "./controllers/message.controller";
import authenticateToken from "./middleware/authenticateToken";
import validateContentType from "./middleware/validateContentType";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post("/check", validateContentType("application/json"), checkHealth);
app.post("/user", validateContentType("application/json"), createUser);
app.post("/login", validateContentType("application/json"), login);
app.post(
  "/messages",
  authenticateToken,
  validateContentType("application/json"),
  sendMessage
);
app.get("/messages", authenticateToken, getMessages);

app.listen(port, () => {
  console.log(`chat-api running on port ${port}`);
});
