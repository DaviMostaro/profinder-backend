import { mockDb } from "../../__mocks__/db.mock";
import { mockEnv } from "../../__mocks__/env.mock";
import { mockJwt } from "../../__mocks__/jwt.mock";
import { mockBcrypt } from "../../__mocks__/bcrypt.mock";
import { userFixture, resetPasswordDataFixture, tokenPayloadFixture, mismatchedTokenPayloadFixture, invalidTokenFixture } from "../../fixtures/user.fixture";
import { resetPasswordService } from "../../../src/services/auth/reset-password.service";
import { TokenInvalidOrNotFoundError } from "../../../src/errors/token-invalid-or-not-found.error";
import { UserNotFoundError } from "../../../src/errors/user-not-found.error";

jest.mock("../../../src/db", () => ({ db: mockDb }));
jest.mock("../../../src/env", () => ({ env: mockEnv }));
jest.mock("jsonwebtoken", () => mockJwt);
jest.mock("bcryptjs", () => mockBcrypt);

describe("resetPasswordService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should reset password successfully", async () => {
        mockJwt.verify.mockReturnValueOnce(tokenPayloadFixture);
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);
        mockBcrypt.hash.mockResolvedValueOnce("hashed_new_password");

        await resetPasswordService({
            id: resetPasswordDataFixture.id,
            token: resetPasswordDataFixture.token,
            newPassword: resetPasswordDataFixture.newPassword
        });

        expect(mockJwt.verify).toHaveBeenCalledWith(resetPasswordDataFixture.token, mockEnv.JWT_SECRET);
        expect(mockDb.query.users.findFirst).toHaveBeenCalled();
        expect(mockBcrypt.hash).toHaveBeenCalledWith(resetPasswordDataFixture.newPassword, 6);
        expect(mockDb.update).toHaveBeenCalled();
    });

    it("should throw TokenInvalidOrNotFoundError if JWT_SECRET is missing", async () => {
        const originalSecret = mockEnv.JWT_SECRET;
        mockEnv.JWT_SECRET = undefined as any;

        await expect(
            resetPasswordService({
                id: resetPasswordDataFixture.id,
                token: invalidTokenFixture,
                newPassword: resetPasswordDataFixture.newPassword
            })
        ).rejects.toThrow(TokenInvalidOrNotFoundError);

        mockEnv.JWT_SECRET = originalSecret;
    });

    it("should throw TokenInvalidOrNotFoundError if token id doesn't match user id", async () => {
        mockJwt.verify.mockReturnValueOnce(mismatchedTokenPayloadFixture);

        await expect(
            resetPasswordService({
                id: resetPasswordDataFixture.id,
                token: resetPasswordDataFixture.token,
                newPassword: resetPasswordDataFixture.newPassword
            })
        ).rejects.toThrow(TokenInvalidOrNotFoundError);
    });

    it("should throw UserNotFoundError if user doesn't exist", async () => {
        mockJwt.verify.mockReturnValueOnce(tokenPayloadFixture);
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);

        await expect(
            resetPasswordService({
                id: resetPasswordDataFixture.id,
                token: resetPasswordDataFixture.token,
                newPassword: resetPasswordDataFixture.newPassword
            })
        ).rejects.toThrow(UserNotFoundError);
    });
});