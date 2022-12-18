import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully');
} catch (error) {
  console.error("Unable to connect to database", error);
}

export default sequelize
