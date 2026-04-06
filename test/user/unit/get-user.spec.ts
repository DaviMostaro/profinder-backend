import {mockDb} from "../../__mocks__/db.mock";
import {userFixture} from "../../fixtures/user.fixture";
import {getUserService, getUserByEmailService} from "../../../src/services/user/get-user.service";

jest.mock("../../../src/db", () => ({db: mockDb}));

describe("getUserService", () => {
    it("should return user data when user is found", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture])
                })
            })
        });

        const result = await getUserService(userFixture.id);

        expect(result).toEqual(userFixture);
    })

    it("should return null when user is not found", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([])
                })
            })
        });

        const result = await getUserService("non-existent-id");

        expect(result).toBeNull();
    })
})

describe("getUserByEmailService", () => {
    it("should return user data when user is found by email", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture])
                })
            })
        });

        const result = await getUserByEmailService(userFixture.email);

        expect(result).toEqual(userFixture);
    })

    it("should return null when user is not found by email", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([])
                })
            })
        });

        const result = await getUserByEmailService("nonexistent@email.com");

        expect(result).toBeNull();
    })
})