import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT || 5000,
  DB: {
    PORT: process.env.DB_PORT || 5432,
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
  },
  AUTH: {
    SALT: process.env.SALT,
  },
  JWT: {
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
  },
};
