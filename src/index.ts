import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";
import {
    locations,
    users,
    categories,
    posts,
    reviews,
    savedPosts,
} from "./db/schema";

async function main() {
    const client = postgres(env.DATABASE_URL!, { prepare: false });
    const db = drizzle({ client });

    // --- SEED (dados iniciais) ---
    console.log("🌱 Seeding data...");

    const insertedLocations = await db
        .insert(locations)
        .values([
            { city: "São Paulo", state: "SP" },
            { city: "Rio de Janeiro", state: "RJ" },
            { city: "Curitiba", state: "PR" },
        ])
        .returning();

    const insertedUsers = await db
        .insert(users)
        .values([
            {
                name: "Carlos Andrade",
                email: "carlos@mail.com",
                password: "hashed-password-123",
                phone: "999990000",
                ddd: "11",
                bio: "Eletricista com 10 anos de experiência",
                rating: 4,
                locationId: insertedLocations[0].id,
            },
            {
                name: "Ana Pereira",
                email: "ana@mail.com",
                password: "hashed-password-123",
                phone: "988887777",
                ddd: "21",
                bio: "Encanadora especializada em emergências residenciais",
                rating: 5,
                locationId: insertedLocations[1].id,
            },
            {
                name: "João Silva",
                email: "joao@mail.com",
                password: "hashed-password-123",
                phone: "977776666",
                ddd: "41",
                bio: "Pintor profissional",
                rating: 3,
                locationId: insertedLocations[2].id,
            },
        ])
        .returning();

    const insertedCategories = await db
        .insert(categories)
        .values([
            { name: "Eletricista" },
            { name: "Encanador" },
            { name: "Pintura" },
        ])
        .returning();

    const insertedPosts = await db
        .insert(posts)
        .values([
            {
                title: "Troca de chuveiro elétrico",
                description: "Faço instalação e troca de chuveiro em até 1h.",
                userId: insertedUsers[0].id,
                categoryId: insertedCategories[0].id,
            },
            {
                title: "Conserto de vazamentos",
                description: "Atendo emergências e identificação de vazamentos.",
                userId: insertedUsers[1].id,
                categoryId: insertedCategories[1].id,
            },
            {
                title: "Pintura de quarto",
                description: "Pintura com acabamento profissional e material incluso.",
                userId: insertedUsers[2].id,
                categoryId: insertedCategories[2].id,
            },
        ])
        .returning();

    await db.insert(reviews).values([
        {
            rating: 5,
            comment: "Excelente atendimento!",
            userId: insertedUsers[1].id,
            postId: insertedPosts[0].id,
        },
        {
            rating: 4,
            comment: "Resolveu meu problema rapidamente.",
            userId: insertedUsers[0].id,
            postId: insertedPosts[1].id,
        },
        {
            rating: 3,
            comment: "Bom serviço, mas poderia ser mais rápido.",
            userId: insertedUsers[2].id,
            postId: insertedPosts[2].id,
        },
    ]);

    await db.insert(savedPosts).values([
        { userId: insertedUsers[1].id, postId: insertedPosts[0].id },
        { userId: insertedUsers[0].id, postId: insertedPosts[2].id },
        { userId: insertedUsers[2].id, postId: insertedPosts[1].id },
    ]);

    console.log("🌱 Seed completed.");

    await client.end();  // fecha a conexão do postgres.js
}

main().catch((err) => {
    console.error("❌ Error during seed:", err);
    process.exit(1);
});
