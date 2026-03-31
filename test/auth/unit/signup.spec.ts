import { mockDb } from "../../__mocks__/db.mock";
import { mockBcrypt } from "../../__mocks__/bcrypt.mock";
import { userFixture, signupDataFixture, signupDataWithoutBioFixture, hashedPasswordFixture } from "../../fixtures/user.fixture";
import { signupService } from "../../../src/services/auth/signup.service";
import { EmailAlreadyExistsError } from "../../../src/errors/email-already-exists.error";

jest.mock("../../../src/db", () => ({ db: mockDb }));
jest.mock("bcryptjs", () => mockBcrypt);

describe("signup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new user successfully", async () => {
        mockBcrypt.hash.mockResolvedValueOnce(hashedPasswordFixture);
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);
        mockDb.insert().values().returning.mockResolvedValueOnce([userFixture]);

        const result = await signupService(signupDataFixture);

        expect(result).toEqual([userFixture]);
        expect(mockDb.insert).toHaveBeenCalled();
        expect(mockBcrypt.hash).toHaveBeenCalledWith(signupDataFixture.password, 6);
    });

    it("should create a new user without bio successfully", async () => {
        mockBcrypt.hash.mockResolvedValueOnce(hashedPasswordFixture);
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);
        mockDb.insert().values().returning.mockResolvedValueOnce([userFixture]);

        const result = await signupService(signupDataWithoutBioFixture);

        expect(result).toEqual([userFixture]);
        expect(mockDb.insert).toHaveBeenCalled();
    });

    it("should throw EmailAlreadyExistsError if email is already taken", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);

        await expect(signupService(signupDataFixture)).rejects.toThrow(EmailAlreadyExistsError);
    });
});
