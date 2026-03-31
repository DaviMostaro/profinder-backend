import { mockDb } from "../../__mocks__/db.mock";
import { mockBcrypt } from "../../__mocks__/bcrypt.mock";
import { signupService } from "../../../src/services/auth/signup.service";
import { userFixture } from "../../fixtures/user.fixture";
import { EmailAlreadyExistsError } from "../../../src/errors/email-already-exists.error";

jest.mock("../../../src/db", () => ({ db: mockDb }));
jest.mock("bcryptjs", () => mockBcrypt);

describe("signup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const signupData = {
        name: "John Doe",
        email: "john@email.com",
        password: "password123",
        ddd: "11",
        phone: "999999999",
        bio: "Bio info"
    };

    it("should create a new user successfully", async () => {
        mockBcrypt.hash.mockResolvedValueOnce("hashed_password");
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);
        mockDb.insert().values().returning.mockResolvedValueOnce([userFixture]);

        const result = await signupService(signupData);

        expect(result).toEqual([userFixture]);
        expect(mockDb.insert).toHaveBeenCalled();
        expect(mockBcrypt.hash).toHaveBeenCalledWith(signupData.password, 6);
    });

    it("should create a new user without bio successfully", async () => {
        const { bio, ...signupDataNoBio } = signupData;
        mockBcrypt.hash.mockResolvedValueOnce("hashed_password");
        mockDb.query.users.findFirst.mockResolvedValueOnce(null);
        mockDb.insert().values().returning.mockResolvedValueOnce([userFixture]);

        const result = await signupService(signupDataNoBio);

        expect(result).toEqual([userFixture]);
        expect(mockDb.insert).toHaveBeenCalled();
    });

    it("should throw EmailAlreadyExistsError if email is already taken", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);

        await expect(signupService(signupData)).rejects.toThrow(EmailAlreadyExistsError);
    });
});
