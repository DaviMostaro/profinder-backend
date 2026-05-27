process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://admin:54321@localhost:3001/profinder";
process.env.JWT_SECRET = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
process.env.BREVO_SMTP_PASS = "fake_pass";
process.env.BREVO_SMTP_HOST = "smtp-relay.brevo.com";
process.env.BREVO_SMTP_PORT = "587";
process.env.BREVO_SMTP_USER = "fake_user";
process.env.CLOUDINARY_NAME = "fake_name";
process.env.CLOUDINARY_API_KEY = "fake_key";
process.env.CLOUDINARY_API_SECRET = "fake_secret";
process.env.FRONTEND_URL = "http://localhost:3000";

jest.mock("../../../src/db", () => ({
  db: {
    query: {
      users: {
        findFirst: jest.fn(),
      },
    },
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

import request from "supertest";
import { app } from "../../../src/server";
import { userFixture, signinDataFixture } from "../../fixtures/user.fixture";

describe("POST /auth/signin", () => {
  const mockFindFirst =
    jest.requireMock("../../../src/db").db.query.users.findFirst;
  const mockCompare = jest.requireMock("bcryptjs").compare;
  const mockSign = jest.requireMock("jsonwebtoken").sign;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200, token and user data when credentials are valid", async () => {
    mockFindFirst.mockResolvedValue(userFixture);
    mockCompare.mockResolvedValue(true);
    mockSign.mockReturnValue("fake-jwt-token");

    const response = await request(app)
      .post("/auth/signin")
      .send(signinDataFixture);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Login realizado com sucesso!",
      token: "fake-jwt-token",
      user: {
        name: userFixture.name,
        email: userFixture.email,
      },
    });
  });

  it("should return 401 when user credentials are not valid", async () => {
    mockFindFirst.mockResolvedValue(null);

    const response = await request(app)
      .post("/auth/signin")
      .send(signinDataFixture);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      title: "InvalidCredentialsError",
      code: "INVALID_CREDENTIALS",
      description: "Email ou senha inválidos",
    });
  });

  it("should return 401 when password is wrong", async () => {
    mockFindFirst.mockResolvedValue(userFixture);
    mockCompare.mockResolvedValue(false);

    const response = await request(app)
      .post("/auth/signin")
      .send({ email: userFixture.email, password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      title: "InvalidCredentialsError",
      code: "INVALID_CREDENTIALS",
    });
  });

  it("should return 400 when email is invalid", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({ email: "invalid-email", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      title: "Validation Error",
      code: "VALIDATION_ERROR",
    });
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].field).toBe("email");
  });

  it("should return 400 when password is too short", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({ email: userFixture.email, password: "123" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      title: "Validation Error",
      code: "VALIDATION_ERROR",
    });
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].field).toBe("password");
  });

  it("should return 400 when email is missing", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({ password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      title: "Validation Error",
      code: "VALIDATION_ERROR",
    });
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].field).toBe("email");
  });

  it("should return 400 when password is missing", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({ email: userFixture.email });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      title: "Validation Error",
      code: "VALIDATION_ERROR",
    });
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].field).toBe("password");
  });
});
