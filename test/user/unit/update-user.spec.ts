import {mockDb} from "../../__mocks__/db.mock";
import {userFixture, updatedUserData, updatedUserResponse} from "../../fixtures/user.fixture";
import {updateUserService} from "../../../src/services/user/update-user.service";
import {UserNotFoundError} from "../../../src/errors/user-not-found.error";

jest.mock("../../../src/db", () => ({db: mockDb}));

describe("updateUserService", () => {
    it("should update user and return updated data", async () => {
        mockDb.update.mockReturnValueOnce({
            set: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    returning: jest.fn().mockResolvedValueOnce([updatedUserResponse])
                })
            })
        });

        const result = await updateUserService({
            userId: userFixture.id,
            data: updatedUserData
        });

        expect(result).toEqual(updatedUserResponse);
    })

    it("should throw UserNotFoundError when user is not found", async () => {
        mockDb.update.mockReturnValueOnce({
            set: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    returning: jest.fn().mockResolvedValueOnce([])
                })
            })
        });

        await expect(
            updateUserService({
                userId: "non-existent-id",
                data: updatedUserData
            })
        ).rejects.toThrow(UserNotFoundError);
    })

    it("should update user with only name", async () => {
        mockDb.update.mockReturnValueOnce({
            set: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    returning: jest.fn().mockResolvedValueOnce([{
                        name: "New Name",
                        avatarUrl: null,
                        ddd: null,
                        phone: null,
                        bio: null,
                        updatedAt: new Date()
                    }])
                })
            })
        });

        const result = await updateUserService({
            userId: userFixture.id,
            data: { name: "New Name" }
        });

        expect(result!.name).toBe("New Name");
    })
})