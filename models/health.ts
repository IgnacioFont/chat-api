import db from "../db.js";

export default {
  async checkDatabase() {
    try {
      await new Promise((resolve, reject) => {
        db.get("SELECT 1", (err: any, row: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};
