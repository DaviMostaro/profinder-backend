export const mockDb = {
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