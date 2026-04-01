export type searchPostResponseType = {
    id: string;
    title: string;
    description: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    categoryId: string | null;
    city: string | null;
    state: string | null;
}