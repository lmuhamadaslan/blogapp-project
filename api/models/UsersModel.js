import { Sequelize } from 'sequelize';
import sequelize from '../database.js';
import Post from './PostsModel.js';

const { DataTypes } = Sequelize;

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Post, {foreignKey: 'id'})
Post.belongsTo(User, {foreignKey: 'uid'})

export default User;


await sequelize.sync();
