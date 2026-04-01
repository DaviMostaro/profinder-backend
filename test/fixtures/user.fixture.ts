export const userFixture = {
    id: "2975e78c-ec47-475b-afa1-96991bbafca2",
    name: "John Doe",
    email: "john@email.com",
    password: "hashed_password",
    createdAt: new Date("2026-02-24 20:15:05.906323"),
}

export const anotherUserFixture = {
    id: "b8f9c12d-3e5a-4f9b-8c1d-2e3f4a5b6c7d",
    name: "Jane Smith",
    email: "jane@email.com",
    password: "hashed_password_123",
    createdAt: new Date("2026-02-25 10:30:00.000000"),
}

export const validResetTokenFixture = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwiaWQiOiIyOTc1ZTc4Yy1lYzQ3LTQ3NWItYWZhMS05Njk5MWJiYWZjYTIifQ.test_signature";

export const expiredResetTokenFixture = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwiaWQiOiIyOTc1ZTc4Yy1lYzQ3LTQ3NWItYWZhMS05Njk5MWJiYWZjYTIiLCJleHAiOjF9.expired_signature";

export const invalidTokenFixture = "invalid.token.string";

export const resetPasswordDataFixture = {
    id: userFixture.id,
    token: validResetTokenFixture,
    newPassword: "newSecurePassword123",
}

export const forgotPasswordDataFixture = {
    email: userFixture.email,
}

export const tokenPayloadFixture = {
    email: userFixture.email,
    id: userFixture.id,
}

export const mismatchedTokenPayloadFixture = {
    email: userFixture.email,
    id: "different-user-id",
}

export const signinDataFixture = {
    email: userFixture.email,
    password: "hashed_password",
}

export const signupDataFixture = {
    name: "John Doe",
    email: "john@email.com",
    password: "password123",
    ddd: "11",
    phone: "999999999",
    bio: "Bio info"
}

export const signupDataWithoutBioFixture = {
    name: "John Doe",
    email: "john@email.com",
    password: "password123",
    ddd: "11",
    phone: "999999999",
}

export const hashedPasswordFixture = "hashed_password";

export const fakeTokenFixture = "fake_token";