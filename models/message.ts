import db from "../db.js";

async function sendMessage(sender: any, recipient: any, content: any) {
  try {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO messages (sender, recipient, type, text, url, height, width, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id, timestamp
      `);

      stmt.get(
        sender,
        recipient,
        content.type,
        content.text || null,
        content.url || null,
        content.height || null,
        content.width || null,
        content.source || null,
        (err: any, row: any) => {
          if (err) {
            reject({ status: 500, message: "Failed to send message" });
          } else if (!row) {
            reject({
              status: 500,
              message: "Failed to retrieve message id and timestamp",
            });
          } else {
            resolve({ id: row.id, timestamp: row.timestamp });
          }
        }
      );

      stmt.finalize();
    });
  } catch (error) {
    throw error;
  }
}

async function getMessages(recipient: any, start: any, limit: any) {
  try {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT id, timestamp, sender, recipient, type, text, url, height, width, source
        FROM messages
        WHERE recipient = ? AND id >= ?
        ORDER BY id ASC
        LIMIT ?
        `,
        [recipient, start, limit],
        (err: any, rows: any) => {
          if (err) {
            reject({ status: 500, message: "Failed to retrieve messages" });
          }

          const messages = rows.map((row: any) => ({
            id: row.id,
            timestamp: row.timestamp,
            sender: row.sender,
            recipient: row.recipient,
            content: {
              type: row.type,
              ...(row.text !== null && { text: row.text }),
              ...(row.url !== null && { url: row.url }),
              ...(row.height !== null && { height: row.height }),
              ...(row.width !== null && { width: row.width }),
              ...(row.source !== null && { source: row.source }),
            },
          }));

          resolve(messages);
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export default { sendMessage, getMessages };
