

import jwt from 'jsonwebtoken';
import { userModel } from '../DB/model/User.model.js';


export const auth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization?.startsWith(process.env.BearerKey)) {
                res.json({ message: "In-valid token or In-valid Bearer Key" })
            } else {
                const token = authorization.split(process.env.BearerKey)[1]
                const decoded = jwt.verify(token, process.env.TOKENSIGNATURE)
                if (!decoded?.id || !decoded.isLoggedIn) {
                    res.json({ message: "In-valid payload" })
                } else {
                    const user = await userModel.findById(decoded.id).select('userName email')//{} null
                    if (!user) {
                        res.status(400).json({ message: "In-valid Token user" })

                    } else {
                        req.user = user
                        next()
                    }

                }
            }
        } catch (error) {
            res.status(500).json({ message: "Catch error", error })

        }

    }
}