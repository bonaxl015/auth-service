export enum ErrorNames {
  // Custom error names
  MISSING_PARAMETER = 'MissingParameter',
  INVALID_PARAMETER = 'InvalidParameter',
  INVALID_ROUTE = 'InvalidRoute',
  DELETE_FAILED = 'DeleteError',
  DATA_NOT_FOUND = 'DataNotFound',

  // Sequelize error names
  SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError',
  SEQUELIZE_UNIQUE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError',
}
