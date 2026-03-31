import { mockEnv } from "../../__mocks__/env.mock";
import { mockJwt } from "../../__mocks__/jwt.mock";
import { userFixture } from "../../fixtures/user.fixture";
import { generateResetToken } from "../../../src/services/auth/generate-reset-token.service";
import { TokenInvalidOrNotFoundError } from "../../../src/errors/token-invalid-or-not-found.error";

jest.mock("../../../src/env", () => ({ env: mockEnv }));
jest.mock("jsonwebtoken", () => mockJwt);

describe("generateResetToken", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should generate a reset token successfully", () => {
        mockJwt.sign.mockReturnValueOnce("fake_reset_token");

        const result = generateResetToken(userFixture.email, userFixture.id);

        expect(mockJwt.sign).toHaveBeenCalledWith(
            { email: userFixture.email, id: userFixture.id },
            mockEnv.JWT_SECRET,
            { expiresIn: "1h" }
        );
        expect(result).toBe("fake_reset_token");
    });

    it("should throw TokenInvalidOrNotFoundError if JWT_SECRET is missing", () => {
        const originalSecret = mockEnv.JWT_SECRET;
        mockEnv.JWT_SECRET = undefined as any;

        expect(() => {
            generateResetToken(userFixture.email, userFixture.id);
        }).toThrow(TokenInvalidOrNotFoundError);

        mockEnv.JWT_SECRET = originalSecret;
    });
});