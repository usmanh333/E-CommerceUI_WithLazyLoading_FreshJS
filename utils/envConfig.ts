import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { MONGODB_URI, JWT_SECRET } = config();

export { MONGODB_URI, JWT_SECRET };