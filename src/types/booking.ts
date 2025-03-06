export interface IBooking {
    _id: string;
    studentId: {
      _id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    tutorId: {
      _id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    subjectId: {
      _id: string;
      userId: string;
      name: string;
      hourly: number;
      image: string;
      gradeLevel: string;
      dateTimes: string[];
      category: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    date: string;
    duration: number;
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  