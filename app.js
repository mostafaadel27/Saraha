
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './DB/connection.js'
import * as indexRouter from './modules/index.router.js'
const app = express()
const port = 3000
const baseUrl = process.env.BASEURL
app.use(express.json())
app.use(`${baseUrl}/uploads` , express.static('./uploads'))
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/post`, indexRouter.postRouter)


app.use('*', (req, res) => res.send('In-valid Routing'))
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))