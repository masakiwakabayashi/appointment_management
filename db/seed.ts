import { config } from "dotenv";
import { db } from "@/db/drizzle";
import { user, account, session, verification, appointment, tag, userTag } from "@/db/schema";
import { hashPassword } from "better-auth/crypto";

config({ path: ".env" });

const EMAIL = "test@example.com";
const PASSWORD = "securePassword123";

async function reset() {
  // FK制約を考慮し、子テーブルから順に削除
  await db.delete(userTag);
  await db.delete(appointment);
  await db.delete(session);
  await db.delete(account);
  await db.delete(verification);
  await db.delete(tag);
  await db.delete(user);
  console.log("Reset complete");
}

async function seed() {
  // シーダー実行前に全てのテーブルをリセットする
  await reset();

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

  const appointmentData = [
    {
      id: crypto.randomUUID(),
      userId,
      name: "田中 太郎",
      occupation: "エンジニア",
      details: "フロントエンド開発の相談。React/Next.js 案件について話す予定。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      userId,
      name: "鈴木 花子",
      occupation: "デザイナー",
      details: "UI/UXデザインのレビュー依頼。Figmaファイルを事前に共有してもらう。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      userId,
      name: "佐藤 次郎",
      occupation: "営業",
      details: "新規契約の提案。予算感と導入時期を確認する。",
      createdAt: now,
      updatedAt: now,
    },
  ];

  await db.insert(appointment).values(appointmentData);

  const tagData = [
    { id: crypto.randomUUID(), tagName: "重要" },
    { id: crypto.randomUUID(), tagName: "フォローアップ" },
    { id: crypto.randomUUID(), tagName: "商談" },
    { id: crypto.randomUUID(), tagName: "技術相談" },
  ];

  await db.insert(tag).values(tagData);

  await db.insert(userTag).values([
    { id: crypto.randomUUID(), userId, tagId: tagData[0].id },
    { id: crypto.randomUUID(), userId, tagId: tagData[1].id },
    { id: crypto.randomUUID(), userId, tagId: tagData[2].id },
    { id: crypto.randomUUID(), userId, tagId: tagData[3].id },
  ]);

  console.log(`Seed complete: ${EMAIL} / ${PASSWORD}`);
  console.log(`  appointments: ${appointmentData.length}件`);
  console.log(`  tags: ${tagData.length}件`);
  console.log(`  user_tags: 4件`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
