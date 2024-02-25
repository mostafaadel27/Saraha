import { Router } from "express";
import { validation } from "../../middelwear/validation.js";
import * as rc from './contoller/register.js'
import * as validators from './auth.validation.js'
const router = Router()





router.post('/signup',validation(validators.signup) ,rc.signup)
router.get('/confirmEmail/:token',validation(validators.confirmEmail)  , rc.confirmEmail)
router.post('/signin' ,validation(validators.signin)  ,rc.login)

export default  router