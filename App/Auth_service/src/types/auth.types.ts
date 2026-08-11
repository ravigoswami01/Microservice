export type UserRole = "USER" | "ADMIN";

export type user = {
  id: string;
  name: string;
  email: string;
  password_hase: string;
  role: UserRole;
  created_at: Date;
};
