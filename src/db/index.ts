import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// console.log("DATABASE_URL em uso:", process.env.DATABASE_URL);

const client = postgres(process.env.DATABASE_URL as string, {
  prepare: true,
});

export const db = drizzle(client, { schema });
