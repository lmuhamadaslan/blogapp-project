import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

const { DataTypes } = Sequelize;

const Post = sequelize.define(
  'posts',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cat: {
      type: DataTypes.STRING
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Post;

await sequelize.sync();
