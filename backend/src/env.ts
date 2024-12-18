import dotenv from 'dotenv';
dotenv.config(); // This should be at the very top
import { cleanEnv, str,  port } from 'envalid';

const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    WEBSITE_URL: str(),
    SERVER_URL: str(),
    SESSION_SECRET: str(),
    POST_REVALIDATION_KEY: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    SMTP_PASSWORD: str(),
    
});

export default env;

///didnt found this useful florian from coding in flow provided to me
///finally on sept 13 2024 I found this useful