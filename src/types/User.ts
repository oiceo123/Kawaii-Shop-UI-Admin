export type User = {
  id: string;
  email: string;
  username: string;
  role_id: number;
};

export type UserTable = {
  key: string | number;
  email: string;
  username: string;
  role: string;
};
