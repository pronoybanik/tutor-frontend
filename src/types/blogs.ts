export interface IBlog {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IBlogResponse {
    data: IBlog[]; 
}
