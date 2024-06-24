export type UserDTO = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDTO = Omit<UserDTO, 'id'>;

export type UpdateUserDTO = Omit<UserDTO, 'password'>;

export type GetUserDTO = Omit<UserDTO, 'password'>;
