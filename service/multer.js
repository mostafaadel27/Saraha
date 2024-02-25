
import multer from 'multer'
import { nanoid } from 'nanoid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const pathName= {
    userProfile:'user/profile',
    userProfileCover:'user/profile/cover',

}
export const validationTypes = {
    iamge: ['image/png', 'image/jpeg', 'image/jif'],
    pdf: ['application/pdf']
}

export const HME = (err, req, res, next) => {

    if (err) {
        res.status(400).json({ message: "multer error", err })
    } else {
        next()
    }
}

export function myMulter(customPath, customValidation) {

    if (!customPath) {
        customPath = 'general'
    }
    if (!customValidation) {
        customValidation= validationTypes.iamge
    }
    console.log(__dirname);
    const fullPath = path.join(__dirname, `../uploads/${customPath}`)
    console.log(fullPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${customPath}`)
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, nanoid() + "_" + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('In-valid Format', false)
        }
    }

    const upload = multer({ dest: fullPath, fileFilter, storage })
    return upload
}