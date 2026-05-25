import { config } from "dotenv";
import { db } from "@/db/drizzle";
import { user, account } from "@/db/schema";
import { hashPassword } from "better-auth/crypto";

config({ path: ".env" });

const EMAIL = "test@example.com";
const PASSWORD = "securePassword123";

async function seed() {
  const userId = crypto.randomUUID();
  const now = new Date();

  await db.insert(user).values({
    id: userId,
    name: "Test User",
    email: EMAIL,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: await hashPassword(PASSWORD),
    createdAt: now,
    updatedAt: now,
  });

  console.log(`Seed complete: ${EMAIL} / ${PASSWORD}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
