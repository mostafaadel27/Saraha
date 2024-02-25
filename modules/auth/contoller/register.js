import { userModel } from "../../../DB/model/User.model.js"
import bcrypt from 'bcryptjs'
import { myEmail } from "../../../service/email.js"
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const user = await userModel.findOne({ email }).select('email')
        if (user) {
            res.status(400).json({ message: 'Email Exist' })
        } else {
            const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
            const newUser = new userModel({ userName, email, password: hash })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id },
                process.env.confirmEmailToken,
                { expiresIn: 60 * 60 })
            const message = `
            <a href='${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}'>Follow me to activate your account</a>
            `
            myEmail(email, 'confirmEmail', message)


            savedUser ? res.status(201).json({ message: 'DOne', savedUser }) :
                res.status(400).json({ message: 'Fail to signUp' })

        }
    } catch (error) {
        res.status(500).json({ message: 'Catch error', error })

    }

}


export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params
        const decoded = jwt.verify(token, process.env.confirmEmailToken)
        if (!decoded?.id) {
            res.status(400).json({ message: "In-valid payload" })
        } else {
            const user = await userModel.updateOne({ _id: decoded.id, confirmEmail: false },
                { confirmEmail: true })
            user.modifiedCount ? res.status(200).json({ message: "Done  plz login" }) : res.status(400).json({ message: "Already confirmed" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Catch error', error })

    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404).json({ message: 'account not Exist' })
        } else {
            if (!user.confirmEmail) {
                res.status(400).json({ message: 'Confirm u email first' })

            } else {
                const match = bcrypt.compareSync(password, user.password)
                if (!match) {
                    res.status(400).json({ message: "In-valid Password" })
                } else {
                    const token = jwt.sign({ id: user._id, isLoggedIn: true },
                        process.env.TOKENSIGNATURE,
                        { expiresIn: 60 * 60 * 24 })
                    res.status(200).json({ message: 'Done', token })
                }
            }

        }
    } catch (error) {
        res.status(500).json({ message: 'Catch error', error })

    }

}
