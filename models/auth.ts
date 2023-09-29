import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db.js";

const secretKey = process.env.JWT_SECRET_KEY || "secret_key";

type UserRow = {
  id: number;
  username: string;
  password: string;
};

type AuthModel = {
  authenticateUser(
    username: string,
    password: string
  ): Promise<{
    token: string;
    userId: number;
  } | null>;
};

const authModel: AuthModel = {
  async authenticateUser(username: string, password: string) {
    try {
      return new Promise((resolve, reject) => {
        db.get<UserRow>(
          "SELECT id, username, password FROM users WHERE username = ?",
          [username],
          async (err: any, row: any) => {
            if (err) {
              reject("Error checking user");
            }

            if (!row) {
              resolve(null);
            } else {
              const passwordMatch = await bcrypt.compare(
                password,
                row.password
              );

              if (!passwordMatch) {
                resolve(null);
              } else {
                const token = jwt.sign(
                  { userId: row.id, username: row.username },
                  secretKey,
                  {
                    expiresIn: "1h",
                  }
                );
                resolve({ token, userId: row.id });
              }
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  },
};

export default authModel;
