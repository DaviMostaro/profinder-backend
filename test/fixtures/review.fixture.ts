export const reviewFixture = {
    id: "review-uuid-1",
    rating: 5,
    comment: "Great service!",
    createdAt: new Date("2026-02-24 20:15:05.906323"),
    userId: "user-uuid-1",
    postId: "post-uuid-1",
}

export const anotherReviewFixture = {
    id: "review-uuid-2",
    rating: 4,
    comment: "Good work!",
    createdAt: new Date("2026-02-25 10:30:00.000000"),
    userId: "user-uuid-2",
    postId: "post-uuid-1",
}

export const reviewWithoutCommentFixture = {
    id: "review-uuid-3",
    rating: 3,
    comment: null,
    createdAt: new Date("2026-02-26 15:45:00.000000"),
    userId: "user-uuid-3",
    postId: "post-uuid-2",
}

export const createReviewDataFixture = {
    userId: "user-uuid-1",
    postId: "post-uuid-1",
    rating: 5,
    comment: "Great service!",
}

export const createReviewWithoutCommentDataFixture = {
    userId: "user-uuid-1",
    postId: "post-uuid-1",
    rating: 4,
}

export const createReviewWithInvalidRatingDataFixture = {
    userId: "user-uuid-1",
    postId: "post-uuid-1",
    rating: 3.5,
    comment: "Test comment",
}

export const userFixture = {
    id: "user-uuid-1",
    name: "John Doe",
    email: "john@email.com",
    password: "hashed_password",
    createdAt: new Date("2026-02-24 20:15:05.906323"),
}

export const anotherUserFixture = {
    id: "user-uuid-2",
    name: "Jane Smith",
    email: "jane@email.com",
    password: "hashed_password",
    createdAt: new Date("2026-02-25 10:30:00.000000"),
}

export const postFixture = {
    id: "post-uuid-1",
    title: "Test Post",
    description: "Test description",
    userId: "user-uuid-1",
    categoryId: "category-uuid-1",
    createdAt: new Date("2026-02-24 20:15:05.906323"),
}

export const anotherPostFixture = {
    id: "post-uuid-2",
    title: "Another Post",
    description: "Another description",
    userId: "user-uuid-2",
    categoryId: "category-uuid-2",
    createdAt: new Date("2026-02-25 10:30:00.000000"),
}
