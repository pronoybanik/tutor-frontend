export interface IProfile {
    _id: string;
    userId: string;
    role: string;
    requestRole: string;
    ratings: number;
    isVerified: boolean;
    experience: number;
    bio: string;
    createdAt: string;
    updatedAt: string;
  }