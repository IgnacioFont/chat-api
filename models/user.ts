import bcrypt from "bcrypt";
import db from "../db";

async function create(username: string, password: string): Promise<number> {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
              reject({ status: 409, message: "Username already exists" });
            } else {
              reject({ status: 500, message: "Error creating user" });
            }
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export default { create };
