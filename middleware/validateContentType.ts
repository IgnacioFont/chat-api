import { Request, Response, NextFunction } from "express";

export default (expectedType: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.is(expectedType)) {
      return res.status(415).json({ error: "Unsupported Media Type" });
    }
    next();
  };
