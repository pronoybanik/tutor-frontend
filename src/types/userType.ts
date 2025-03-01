export interface IUser {
    userId: string;
    name: string;
    email: string;
    role: "student" | "admin" | "tutor";
    iat?: number;
    exp?: number;
  }
  