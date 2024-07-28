/* eslint-disable brace-style */
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '@db/config';
import { CreateUserInput, UserAttributes } from '@db/types/user.types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CreateUserDTO } from '@api/dto/user.dto';

dotenv.config();

class User
  extends Model<UserAttributes, CreateUserInput>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public validatePassword(enteredPassword: string): boolean {
    return bcrypt.compareSync(enteredPassword, this.password);
  }

  public static getSignedJwtToken(user: CreateUserDTO): string {
    const jwtSecret: string | undefined = process.env.JWT_SECRET as string;
    return jwt.sign(user, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_username',
        msg: 'Username is already taken',
      },
      field: 'username',
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty',
        },
        len: {
          args: [1, 12],
          msg: 'Username must be between 1 and 12 characters',
        },
      },
      set(value: string) {
        const username = this.getDataValue('username');
        if (!username || username === value) {
          this.setDataValue('username', value);
        } else {
          throw new Error('Username cannot be changed once set.');
        }
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName',
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lastName',
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
        len: {
          args: [6, 255],
          msg: 'Password must be at least 6 characters long',
        },
      },
    },
  },
  {
    tableName: 'User',
    timestamps: true,
    sequelize: sequelizeConnection,
    hooks: {
      beforeCreate: async (user) => {
        const salt: string = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeBulkCreate: async (users) => {
        const salt: string = await bcrypt.genSalt(10);
        for (const user of users) {
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt: string = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

export default User;
