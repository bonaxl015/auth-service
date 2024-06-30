export type CurrentEnvironment = 'development' | 'test' | 'production';

type DBConfigData = {
  database: string;
  host: string;
  user: string;
  password: string;
  port: string;
};

export interface DBConfigMapping {
  development: DBConfigData;
  test: DBConfigData;
  production: DBConfigData;
}
