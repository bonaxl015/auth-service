export enum ErrorNames {
  // Custom error names
  MISSING_PARAMETER = 'MissingParameter',
  INVALID_PARAMETER = 'InvalidParameter',
  INVALID_ROUTE = 'InvalidRoute',
  DELETE_FAILED = 'DeleteError',
  DATA_NOT_FOUND = 'DataNotFound',

  // Auth error names
  EMPTY_TOKEN = 'EmptyToken',
  EMPTY_USERNAME = 'EmptyUsername',
  EMPTY_PASSWORD = 'EmptyPassword',
  USER_NOT_FOUND = 'UserNotFound',
  USER_PASSWORD_NOT_MATCH = 'UserPasswordNotMatch',

  // Sequelize error names
  SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError',
  SEQUELIZE_UNIQUE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError',
}
