import express from 'express';
// import database from './database.js'
import cors from 'cors';
import UserRoute from "./routes/AuthRoute.js"
import PostRoute from "./routes/PostRoute.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import multer from "multer"

const app = express();
dotenv.config()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

// membuat storage destination dan filname
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

// membuat upload yang menampung storage
const upload = multer({storage})

// membuat route untuk upload file
app.post('/api/upload', upload.single('file'), function (req, res) {
  try {
    const file = req.file
    res.status(200).json(file.filename)
  } catch (error) {
    res.status(500).json(error)
  }
})


app.use("/api/auth", UserRoute)
app.use("/api/posts", PostRoute)

app.listen(8800, () => {
  console.log('Server running in port 8800');
});
