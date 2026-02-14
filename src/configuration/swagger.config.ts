import { swaggerPaths } from "./swagger.paths";

const definition = {
  openapi: "3.0.0",
  info: {
    title: "ProFinder API",
    version: "1.0.0",
    description:
      "API for ProFinder — find and connect with local service providers (electricians, plumbers, painters, etc.).",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token obtained from signin or signup",
      },
    },
    schemas: {
      SignupBody: {
        type: "object",
        required: ["name", "email", "password", "ddd", "phone"],
        properties: {
          name: { type: "string", minLength: 2, example: "John Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", minLength: 6, example: "secret123" },
          ddd: { type: "string", minLength: 2, maxLength: 2, example: "11" },
          phone: { type: "string", minLength: 9, maxLength: 9, example: "999990000" },
          bio: { type: "string", nullable: true, example: "Professional electrician" },
        },
      },
      SigninBody: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", minLength: 8, example: "password8chars" },
        },
      },
      UpdateUserBody: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 2, maxLength: 100 },
          ddd: { type: "string", length: 2 },
          phone: { type: "string", minLength: 8, maxLength: 9 },
          bio: { type: "string", maxLength: 500 },
          avatarUrl: { type: "string", format: "uri" },
        },
      },
      PublishPostBody: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string", maxLength: 255, example: "Electrical repair" },
          description: { type: "string", example: "Residential and commercial services." },
          categoryId: { type: "string", format: "uuid", nullable: true },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          avatar: { type: "string", nullable: true },
          ddd: { type: "string", nullable: true },
          phone: { type: "string", nullable: true },
          bio: { type: "string", nullable: true },
          rating: { type: "integer" },
          locationId: { type: "string", format: "uuid", nullable: true },
          createdAt: { type: "string", format: "date-time", nullable: true },
          updatedAt: { type: "string", format: "date-time", nullable: true },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          categoryId: { type: "string", format: "uuid", nullable: true },
          createdAt: { type: "string", format: "date-time", nullable: true },
          updatedAt: { type: "string", format: "date-time", nullable: true },
          images: {
            type: "array",
            items: { type: "object", properties: { url: { type: "string" } } },
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string" },
          error: { type: "string" },
          issues: { type: "object" },
        },
      },
    },
  },
  tags: [
    { name: "Health", description: "Health check" },
    { name: "Auth", description: "Authentication (signup, signin)" },
    { name: "User", description: "User profile and posts" },
    { name: "Post", description: "Service posts" },
  ],
  paths: swaggerPaths,
};

export const swaggerSpec = definition;
