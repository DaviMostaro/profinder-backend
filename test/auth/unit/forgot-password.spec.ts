import { mockDb } from "../../__mocks__/db.mock";
import { mockEnv } from "../../__mocks__/env.mock";
import { mockNodemailer } from "../../__mocks__/nodemailer.mock";
import { userFixture, forgotPasswordDataFixture } from "../../fixtures/user.fixture";
import { forgotPasswordService } from "../../../src/services/auth/forgot-password.service";
import { UserNotFoundError } from "../../../src/errors/user-not-found.error";

jest.mock("../../../src/db", () => ({ db: mockDb }));
jest.mock("../../../src/env", () => ({ env: mockEnv }));
jest.mock("nodemailer", () => mockNodemailer);

describe("forgotPasswordService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should send reset password email successfully", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);

        const result = await forgotPasswordService(forgotPasswordDataFixture.email);

        expect(mockDb.query.users.findFirst).toHaveBeenCalled();
        expect(mockNodemailer.createTransport).toHaveBeenCalled();
        expect(mockNodemailer.createTransport().verify).toHaveBeenCalled();
        expect(result).toHaveProperty("resetUrl");
        expect(result).toHaveProperty("mailOptions");
        expect(result).toHaveProperty("mailSender");
    });

    it("should throw UserNotFoundError if user doesn't exist", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);

        await expect(
            forgotPasswordService(forgotPasswordDataFixture.email)
        ).rejects.toThrow(UserNotFoundError);
    });
});