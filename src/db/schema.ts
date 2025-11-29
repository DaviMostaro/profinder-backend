import {
    pgTable, text, varchar, timestamp, uuid, integer, decimal
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ========== LOCATION ==========
export const locations = pgTable("locations", {
    id: uuid("id").primaryKey().defaultRandom(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
});

// ========== USERS ==========
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 200 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    ddd: varchar("ddd", { length: 2 }),
    phone: varchar("phone", { length: 9 }),
    bio: text("bio"),
    rating: integer("rating").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),

    locationId: uuid("location_id").references(() => locations.id),
});

// ========== CATEGORY ==========
export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull().unique(),
});

// ========== POSTS ==========
export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),

    userId: uuid("user_id").notNull().references(() => users.id),
    categoryId: uuid("category_id").references(() => categories.id),
});

// ========== REVIEWS ==========
export const reviews = pgTable("reviews", {
    id: uuid("id").primaryKey().defaultRandom(),
    rating: integer("rating").notNull().default(0),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow(),

    userId: uuid("user_id").notNull().references(() => users.id),
    postId: uuid("post_id").notNull().references(() => posts.id),
});

// ========== SAVED POSTS ==========
export const savedPosts = pgTable("saved_posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").defaultNow(),

    userId: uuid("user_id").notNull().references(() => users.id),
    postId: uuid("post_id").notNull().references(() => posts.id),
});

// ========== RELATIONSHIPS ==========

export const usersRelations = relations(users, ({ one, many }) => ({
    location: one(locations, {
        fields: [users.locationId],
        references: [locations.id],
    }),
    posts: many(posts),
    reviews: many(reviews),
    savedPosts: many(savedPosts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
    user: one(users, {
        fields: [posts.userId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [posts.categoryId],
        references: [categories.id],
    }),
    reviews: many(reviews),
    savedBy: many(savedPosts),
}));