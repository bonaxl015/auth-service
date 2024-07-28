export type UserDTO = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterUserDTO = Omit<UserDTO, 'id' | 'password'>;

export type LoginUserDTO = Omit<UserDTO, 'password'>;

export type UpdateUserDTO = Omit<UserDTO, 'password'>;

export type GetUserDTO = Omit<UserDTO, 'password'>;
