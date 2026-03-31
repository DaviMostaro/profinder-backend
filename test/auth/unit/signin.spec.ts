import {mockDb} from "../../__mocks__/db.mock";
import {mockBcrypt} from "../../__mocks__/bcrypt.mock";
import {mockJwt} from "../../__mocks__/jwt.mock";
import {userFixture, signinDataFixture, fakeTokenFixture} from "../../fixtures/user.fixture";
import {signinService} from "../../../src/services/auth/signin.service";
import {InvalidCredentialsError} from "../../../src/errors/invalid-credentials.error";

jest.mock("../../../src/db", () => ({db: mockDb}));
jest.mock("bcryptjs", () => mockBcrypt);
jest.mock("jsonwebtoken", () => mockJwt);

describe("signin", () => {
    it("should login an user and return a token and user data", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);
        mockBcrypt.compare.mockResolvedValueOnce(true);
        mockJwt.sign.mockReturnValueOnce(fakeTokenFixture);

        const result = await signinService(signinDataFixture);

        expect(result).toEqual({user: userFixture, token: fakeTokenFixture});
    })

    it("shouldn't find an user and throw an InvalidCredentialsError", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce("");

        await expect(
            signinService(signinDataFixture)
        ).rejects.toThrow(InvalidCredentialsError);
    })

    it("shouldn't login an user with wrong password and throw an InvalidCredentialsError", async () => {
        mockDb.query.users.findFirst.mockResolvedValueOnce(userFixture);

        await expect(
            signinService({ email: userFixture.email, password: "" })
        ).rejects.toThrow(InvalidCredentialsError);
    })
})