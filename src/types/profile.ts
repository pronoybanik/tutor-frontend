export interface IReview {
  studentId: string; 
  comment: string;
  rating: number;
  createdAt?: string; 
}

export interface IAvailability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IRates {
  hourlyRate: number;
  discount?: number;
}

export interface IProfile{
  _id: string;
  userId: string; 
  image?: string;
  bio?: string;
  subjects: string[];
  role: string; 
  experience?: number;
  rates: IRates;
  availability: IAvailability[];
  ratings?: number;
  reviews: IReview[];
  requestRole?: string; 
  isVerified?: boolean;
  callToAction?: string;
  createdAt?: string; 
  updatedAt?: string; 
}