import { mockDb } from "../../__mocks__/db.mock";
import { getReviewsService } from "../../../src/services/reviews/get-reviews.services";
import { NotFoundPostError } from "../../../src/errors/not-found-post.error";
import {
    reviewFixture,
    anotherReviewFixture,
    reviewWithoutCommentFixture,
    postFixture,
} from "../../fixtures/review.fixture";

jest.mock("../../../src/db", () => ({ db: mockDb }));

describe("getReviewsService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get reviews for a post successfully", async () => {
        mockDb.query.posts.findFirst.mockResolvedValueOnce(postFixture);
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    orderBy: jest.fn().mockReturnValueOnce({
                        limit: jest.fn().mockReturnValueOnce({
                            offset: jest.fn().mockResolvedValueOnce([reviewFixture, anotherReviewFixture]),
                        }),
                    }),
                }),
            }),
        });

        const result = await getReviewsService("post-uuid-1", 1, 10);

        expect(result).toEqual([
            { rating: reviewFixture.rating, comment: reviewFixture.comment },
            { rating: anotherReviewFixture.rating, comment: anotherReviewFixture.comment },
        ]);

        expect(mockDb.select).toHaveBeenCalled();
        expect(mockDb.query.posts.findFirst).toHaveBeenCalled();
    });

    it("should return empty string for null comment", async () => {
        mockDb.query.posts.findFirst.mockResolvedValueOnce(postFixture);
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    orderBy: jest.fn().mockReturnValueOnce({
                        limit: jest.fn().mockReturnValueOnce({
                            offset: jest.fn().mockResolvedValueOnce([reviewWithoutCommentFixture]),
                        }),
                    }),
                }),
            }),
        });

        const result = await getReviewsService("post-uuid-1", 1, 10);

        expect(result).toEqual([{ rating: reviewWithoutCommentFixture.rating, comment: "" }]);

        expect(mockDb.select).toHaveBeenCalled();
        expect(mockDb.query.posts.findFirst).toHaveBeenCalled();
    });

    it("should throw NotFoundPostError if post does not exist", async () => {
        mockDb.query.posts.findFirst.mockResolvedValueOnce(null);

        await expect(getReviewsService("invalid-post-id", 1, 10)).rejects.toThrow(NotFoundPostError);
        expect(new NotFoundPostError().message).toBe("Post não encontrado");

        expect(mockDb.query.posts.findFirst).toHaveBeenCalled();
        expect(mockDb.select).not.toHaveBeenCalled();
    });

    it("should throw NotFoundPostError if postId is empty", async () => {
        mockDb.query.posts.findFirst.mockResolvedValueOnce(null);

        await expect(getReviewsService("", 1, 10)).rejects.toThrow(NotFoundPostError);
        expect(new NotFoundPostError().message).toBe("Post não encontrado");

        expect(mockDb.query.posts.findFirst).toHaveBeenCalled();
        expect(mockDb.select).not.toHaveBeenCalled();
    });

    it("should return empty array if no reviews found", async () => {
        mockDb.query.posts.findFirst.mockResolvedValueOnce(postFixture);
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    orderBy: jest.fn().mockReturnValueOnce({
                        limit: jest.fn().mockReturnValueOnce({
                            offset: jest.fn().mockResolvedValueOnce([]),
                        }),
                    }),
                }),
            }),
        });

        const result = await getReviewsService("post-uuid-1", 1, 10);

        expect(result).toEqual([]);

        expect(mockDb.select).toHaveBeenCalled();
        expect(mockDb.query.posts.findFirst).toHaveBeenCalled();
    });
});
