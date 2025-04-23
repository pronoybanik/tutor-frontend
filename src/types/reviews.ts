type Student = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: 'student';
    status: string;
    __v: number;
};

export type TReviews = {
    _id: string;
    comment: string;
    createdAt: string;
    studentId: Student;
};
