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
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/auth/signout": {
    post: {
      tags: ["Auth"],
      summary: "Sign out",
      description: "Logs out the authenticated user by clearing the authentication cookie.",
      operationId: "signout",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Logout realizado com sucesso" },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized - invalid or missing JWT",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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
          description: "Invalid ID format",
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
          description: "Invalid ID format",
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

  "/user/{id}/update": {
    put: {
      tags: ["User"],
      summary: "Update user",
      description: "Updates the authenticated user's profile. Requires JWT. Supports multipart/form-data for avatar upload.",
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
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", minLength: 2, maxLength: 100 },
                ddd: { type: "string", length: 2 },
                phone: { type: "string", minLength: 8, maxLength: 9 },
                bio: { type: "string", maxLength: 500 },
                avatar: { type: "string", format: "binary" },
              },
            },
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
        "403": {
          description: "Forbidden — user ID does not match authenticated user",
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
        "403": {
          description: "Forbidden - user ID does not match authenticated user",
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
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", maxLength: 255 },
                description: { type: "string" },
                categoryId: { type: "string", format: "uuid", nullable: true },
                images: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
              },
            },
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

  "/post/saved-posts": {
    get: {
      tags: ["Post"],
      summary: "Get saved posts",
      description: "Returns all posts saved by the authenticated user. Requires JWT.",
      operationId: "getSavedPosts",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of saved posts",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Post" },
              },
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
        "404": {
          description: "No saved posts found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/post/{id}/save": {
    post: {
      tags: ["Post"],
      summary: "Save a post",
      description: "Saves a post for the authenticated user. Requires JWT.",
      operationId: "savePost",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Post ID",
        },
      ],
      responses: {
        "200": {
          description: "Post saved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Post salvo com sucesso" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid ID",
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

  "/post/{id}/remove": {
    delete: {
      tags: ["Post"],
      summary: "Remove saved post",
      description: "Removes a saved post for the authenticated user. Requires JWT.",
      operationId: "removeSavedPost",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Saved post ID",
        },
      ],
      responses: {
        "200": {
          description: "Saved post removed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Post removido com sucesso" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid ID",
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
        "404": {
          description: "Saved post not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/post/{id}/update": {
    put: {
      tags: ["Post"],
      summary: "Update a post",
      description: "Updates an existing post. Requires JWT and ownership. Supports image upload.",
      operationId: "updatePost",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Post ID",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdatePostBody" },
          },
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", maxLength: 255 },
                description: { type: "string" },
                categoryId: { type: "string", format: "uuid", nullable: true },
                images: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Post updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Post" },
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
        "404": {
          description: "Post not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/post/{id}/delete": {
    delete: {
      tags: ["Post"],
      summary: "Delete a post",
      description: "Deletes a post. Requires JWT and ownership.",
      operationId: "deletePost",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Post ID",
        },
      ],
      responses: {
        "200": {
          description: "Post deleted",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Post deletado com sucesso" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid ID",
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
        "404": {
          description: "Post not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/search": {
    get: {
      tags: ["Search"],
      summary: "Search posts",
      description: "Searches for posts by query string with optional filters for category, location, and ordering.",
      operationId: "searchPosts",
      security: [],
      parameters: [
        {
          name: "q",
          in: "query",
          required: true,
          schema: { type: "string", minLength: 3 },
          description: "Search query (minimum 3 characters)",
        },
        {
          name: "page",
          in: "query",
          schema: { type: "number", default: 1 },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "number", default: 10 },
          description: "Items per page",
        },
        {
          name: "order",
          in: "query",
          schema: { type: "string", enum: ["asc", "desc"], default: "asc" },
          description: "Sort order",
        },
        {
          name: "category",
          in: "query",
          schema: { type: "string" },
          description: "Category ID filter",
        },
        {
          name: "location",
          in: "query",
          schema: { type: "string" },
          description: "Location filter (city name)",
        },
      ],
      responses: {
        "200": {
          description: "Search results",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  posts: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Post" },
                  },
                  total: { type: "number" },
                  page: { type: "number" },
                  limit: { type: "number" },
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

  "/reviews/{postId}": {
    get: {
      tags: ["Reviews"],
      summary: "Get reviews for a post",
      description: "Returns all reviews for a specific post.",
      operationId: "getPostReviews",
      security: [],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Post ID",
        },
        {
          name: "page",
          in: "query",
          schema: { type: "number", default: 1 },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "number", default: 10 },
          description: "Items per page",
        },
      ],
      responses: {
        "200": {
          description: "List of reviews",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  reviews: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Review" },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid post ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "Post not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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

  "/reviews/{userId}/{postId}": {
    post: {
      tags: ["Reviews"],
      summary: "Create a review",
      description: "Creates a review for a user and post. Requires JWT.",
      operationId: "createReview",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID being reviewed",
        },
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "Post ID related to the review",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateReviewBody" },
          },
        },
      },
      responses: {
        "201": {
          description: "Review created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  rating: { type: "number" },
                  comment: { type: "string" },
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
        "404": {
          description: "User or post not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
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
};