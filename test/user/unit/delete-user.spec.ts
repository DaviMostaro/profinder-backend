import {mockDb} from "../../__mocks__/db.mock";
import {userFixture} from "../../fixtures/user.fixture";
import {deleteUserService} from "../../../src/services/user/delete-user.service";
import {DeleteUserError} from "../../../src/errors/delete-user.error";

jest.mock("../../../src/db", () => ({db: mockDb}));

describe("deleteUserService", () => {
    it("should delete user and return success message", async () => {
        mockDb.delete.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                returning: jest.fn().mockResolvedValueOnce([{ id: userFixture.id }])
            })
        });

        const result = await deleteUserService(userFixture.id);

        expect(result).toEqual({ message: "Usuário deletado com sucesso" });
    })

    it("should throw DeleteUserError when user is not found", async () => {
        mockDb.delete.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                returning: jest.fn().mockResolvedValueOnce([])
            })
        });

        await expect(
            deleteUserService("non-existent-id")
        ).rejects.toThrow(DeleteUserError);
    })
})