/* eslint-disable brace-style */
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '@db/config';
import { CreateUserInput, UserAttributes } from '@db/types/user.types';
import bcrypt from 'bcryptjs';

class User
  extends Model<UserAttributes, CreateUserInput>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  validatePassword: ((password: string) => boolean) | undefined;
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

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
