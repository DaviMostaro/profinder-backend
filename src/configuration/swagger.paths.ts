/**
 * OpenAPI path definitions for ProFinder API (English).
 */

export const swaggerPaths = {
  "/ping": {
    get: {
      tags: ["Health"],
      summary: "Health check",
      description: "Returns a simple pong message to verify the API is running.",
      operationId: "ping",
      security: [],
      responses: {
        "200": {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { message: { type: "string", example: "pong" } },
              },
            },
          },
        },
      },
    },
  },

  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description: "Creates a new user account and returns a JWT token.",
      operationId: "signup",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SignupBody" },
          },
        },
      },
      responses: {
        "201": {
          description: "User created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "User created" },
                  token: { type: "string", description: "JWT token" },
                  user: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      email: { type: "string" },
                      ddd: { type: "string" },
                      phone: { type: "string" },
                      bio: { type: "string", nullable: true },
                    },
                  },
                },
              },
            },
          },
        },
        "409": {
          description: "Email already registered",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/auth/signin": {
    post: {
      tags: ["Auth"],
      summary: "Sign in",
      description: "Authenticates with email and password. Returns a JWT and sets an httpOnly cookie.",
      operationId: "signin",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SigninBody" },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  token: { type: "string", description: "JWT token" },
                  user: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/auth/signout": {
    post: {
      tags: ["Auth"],
      summary: "Sign out",
      description: "Logs out the authenticated user by clearing the authentication cookie.",
      operationId: "signout",
      security: [{ bearerAuth: [] }],
      responses: {
        "204": {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/user/{id}": {
    get: {
      tags: ["User"],
      summary: "Get user by ID",
      description: "Returns the public profile of a user by their ID.",
      operationId: "getUser",
      security: [],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        "200": {
          description: "User found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Missing or invalid ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/user/{id}/posts": {
    get: {
      tags: ["User"],
      summary: "Get posts by user ID",
      description: "Returns all service posts published by the given user.",
      operationId: "getUserPosts",
      security: [],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        "200": {
          description: "List of posts",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  posts: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Missing or invalid ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "No posts found for this user",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/user/{id}/update": {
    put: {
      tags: ["User"],
      summary: "Update user",
      description: "Updates the authenticated user's profile. Requires JWT.",
      operationId: "updateUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID (must match authenticated user)",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateUserBody" },
          },
        },
      },
      responses: {
        "200": {
          description: "User updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
        "400": {
          description: "Validation error or missing ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized — invalid or missing JWT",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/user/{id}/delete": {
    delete: {
      tags: ["User"],
      summary: "Delete user",
      description: "Deletes the user account. Requires JWT.",
      operationId: "deleteUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        "200": {
          description: "User deleted",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Usuário deletado com sucesso" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid or missing ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Server error while deleting",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },

  "/post": {
    post: {
      tags: ["Post"],
      summary: "Publish a post",
      description: "Creates a new service post for the authenticated user. Requires JWT.",
      operationId: "publishPost",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/PublishPostBody" },
          },
        },
      },
      responses: {
        "201": {
          description: "Post created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  post: { $ref: "#/components/schemas/Post" },
                },
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
};