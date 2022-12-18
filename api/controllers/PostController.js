import { Op } from 'sequelize';
import Post from '../models/PostsModel.js';
import User from '../models/UsersModel.js';
import jwt from 'jsonwebtoken'

export const getPosts = async (req, res) => {
  try {
    const data = req.query.cat ? await Post.findAll({
      where: {
        cat: {
          [Op.eq]: `${req.query.cat}`
        }
      }
    }) : await Post.findAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPostById = async (req, res) => {
  try {
    // joint data from table users and posts
    const data = await Post.findAll({
      where: {
        id: {
          [Op.eq]: `${req.params.id}`
        }
      },
      include: {
        model: User,
        attributes: ['username', ['img', 'imgUser']]
      }
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const addPost = async (req, res) => {

}

export const updatePost = async (req, res) => {

}

export const deletePost = async (req, res) => {
  // get token from cookies
  const token = req.cookies.access_token
  if (!token) return res.status(401).json("Not authenticated!")

  jwt.verify(token, 'jwtkey', async (err, decoded) => {
    if (err) return res.status(403).json("Not authorized!")

    const { id } = decoded
    const { idPost } = req.params

    try {
      await Post.destroy({
        where: {
          id: {
            [Op.eq]: `${idPost}`
          },
          uid: {
            [Op.eq]: `${id}`
          }
        }
      })
      res.status(200).json("Post has been delete")
    } catch (error) {
      console.log(error)
    }
  })
}
