import jwt, { VerifyErrors, Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey: Secret = process.env.JWT_SECRET_KEY || "secret_key";

export default (
  req: any,
  res: Response,
  next: NextFunction
): Response | unknown => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
