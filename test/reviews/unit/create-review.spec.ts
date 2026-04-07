import { mockDb } from "../../__mocks__/db.mock";
import { createReviewService } from "../../../src/services/reviews/create-review.service";
import { UserNotFoundError } from "../../../src/errors/user-not-found.error";
import { NotFoundPostError } from "../../../src/errors/not-found-post.error";
import { RatingNotIntegerError } from "../../../src/errors/rating-not-integer.error";
import {
    createReviewDataFixture,
    createReviewWithoutCommentDataFixture,
    createReviewWithInvalidRatingDataFixture,
    reviewFixture,
    userFixture,
    postFixture,
} from "../../fixtures/review.fixture";

jest.mock("../../../src/db", () => ({ db: mockDb }));

describe("createReviewService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a review successfully", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture]),
                }),
            }),
        });
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([postFixture]),
                }),
            }),
        });
        mockDb.insert.mockReturnValueOnce({
            values: jest.fn().mockReturnValueOnce({
                returning: jest.fn().mockResolvedValueOnce([reviewFixture]),
            }),
        });

        const result = await createReviewService(createReviewDataFixture);

        expect(result).toEqual(reviewFixture);
        expect(mockDb.insert).toHaveBeenCalled();
        expect(mockDb.select).toHaveBeenCalled();
        
        expect(new NotFoundPostError().message).not.toBe("Post not found");
        expect(new RatingNotIntegerError().message).not.toBe("Rating must be an integer");
        expect(new UserNotFoundError().message).not.toBe("User not found");
    });

    it("should create a review without comment successfully", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture]),
                }),
            }),
        });
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([postFixture]),
                }),
            }),
        });
        mockDb.insert.mockReturnValueOnce({
            values: jest.fn().mockReturnValueOnce({
                returning: jest.fn().mockResolvedValueOnce([reviewFixture]),
            }),
        });

        const result = await createReviewService(createReviewWithoutCommentDataFixture);

        expect(result).toEqual(reviewFixture);
        expect(mockDb.insert).toHaveBeenCalled();
        expect(mockDb.select).toHaveBeenCalled();
    });

    it("should throw UserNotFoundError if user does not exist", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([]),
                }),
            }),
        });

        await expect(createReviewService(createReviewDataFixture)).rejects.toThrow(UserNotFoundError);
        expect(mockDb.select).toHaveBeenCalled();
        expect(new UserNotFoundError().message).toBe("Usuário não encontrado");

        expect(mockDb.insert).not.toHaveBeenCalled();
    });

    it("should throw NotFoundPostError if post does not exist", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture]),
                }),
            }),
        });
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([]),
                }),
            }),
        });

        await expect(createReviewService(createReviewDataFixture)).rejects.toThrow(NotFoundPostError);
        expect(mockDb.select).toHaveBeenCalled();
        expect(new NotFoundPostError().message).toBe("Post não encontrado");

        expect(mockDb.insert).not.toHaveBeenCalled();
    });

    it("should throw RatingNotIntegerError if rating is not an integer", async () => {
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([userFixture]),
                }),
            }),
        });
        mockDb.select.mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                    limit: jest.fn().mockResolvedValueOnce([postFixture]),
                }),
            }),
        });

        await expect(createReviewService(createReviewWithInvalidRatingDataFixture)).rejects.toThrow(RatingNotIntegerError);
        expect(mockDb.select).toHaveBeenCalled();
        expect(new RatingNotIntegerError().message).toBe("A avaliação deve ser um número inteiro entre 1 e 5");

        expect(mockDb.insert).not.toHaveBeenCalled();
    });
});
