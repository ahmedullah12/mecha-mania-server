// directly address korar jonno index.ts name dawa hoise
// automatic refer
import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  clerk_webhook_secret: process.env.CLERK_WEBHOOK_SECRET,
};
