export const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    query: {
        users: {
            findFirst: jest.fn(),
        },
        posts: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
        }
    }
}