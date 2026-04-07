export const userPostsFixture = [
    {
        id: "post-1",
        title: "Post 1",
        description: "Description 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "category-1",
        images: [{ url: "http://image1.com" }]
    },
    {
        id: "post-2",
        title: "Post 2",
        description: "Description 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "category-2",
        images: []
    }
];

export const postFixture = {
    id: "post-1",
    title: "Post 1",
    description: "Description 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: "category-1",
    images: [{ url: "http://image1.com" }]
};