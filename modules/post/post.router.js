import { Router } from "express";
import { auth } from "../../middelwear/auth.js";
import { HME, myMulter, validationTypes } from "../../service/clodMulter.js";
import * as pc from './controller/post.js'
const router = Router()




router.post('/',myMulter(validationTypes.iamge).single('image'), HME ,auth() , pc.addPost)
router.patch('/:id/like' ,auth() , pc.likePost)
router.patch('/:id/unlike' ,auth() , pc.unlikePost)




export default router