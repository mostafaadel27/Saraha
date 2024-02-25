import { Router } from "express";
import { auth } from "../../middelwear/auth.js";
// import { HME, myMulter, pathName, validationTypes } from "../../service/multer.js";
import { HME, myMulter, validationTypes } from "../../service/clodMulter.js";

import * as uc from './controller/user.js'
const router = Router()




router.get('/profile', auth(), uc.profile)
router.get('/profile/pic',
    myMulter(validationTypes.iamge).single('image'),
    HME, auth(), uc.profilePic)
router.get('/profile/cov',
    myMulter(validationTypes.iamge).array('image', 5),
    HME, auth(), uc.profileCov)




export default router