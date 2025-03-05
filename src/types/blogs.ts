interface Author {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IBlog {
    _id: string;
    title: string;
    content: string;
    author: Author;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

