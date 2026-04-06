import {mockDb} from "../../__mocks__/db.mock";
import {userFixture} from "../../fixtures/user.fixture";
import {userPostsFixture} from "../../fixtures/post.fixture";
import {getUserPostsService} from "../../../src/services/user/get-user-posts.service";

jest.mock("../../../src/db", () => ({db: mockDb}));

describe("getUserPostsService", () => {
    it("should return user posts when user has posts", async () => {
        mockDb.query.posts.findMany.mockResolvedValueOnce(userPostsFixture);

        const result = await getUserPostsService(userFixture.id);

        expect(result).toEqual(userPostsFixture);
    })

    it("should return empty array when user has no posts", async () => {
        mockDb.query.posts.findMany.mockResolvedValueOnce([]);

        const result = await getUserPostsService(userFixture.id);

        expect(result).toEqual([]);
    })
})