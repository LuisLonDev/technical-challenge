/* eslint-disable-next-line @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  name: 'dev',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
};
