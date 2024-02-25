import { userModel } from "../../../DB/model/User.model.js"
import cloudinary from "../../../service/cloudinary.js"

export const profile = async (req, res) => {

    const user = await userModel.findById(req.user._id)
    res.status(200).json({ message: "Done", user })
}
export const profilePic = async (req, res) => {

    if (!req.file) {
        res.json({ message: "Please upload u image" })
    } else {


        const {secure_url} = await cloudinary.uploader.upload(req.file.path, {
            folder: `user/profilePic/${req.user._id}`
        })
        // const image = req.file.destination + "/" + req.file.filename

        await userModel.updateOne({ _id: req.user._id }, { profilePic:secure_url })
        res.status(200).json({ message: "Done", secure_url })
    }

}
export const profileCov = async (req, res) => {

    if (!req.files) {
        res.json({ message: "Please upload u image" })
    } else {

        const urls = []
        req.files.forEach(file => {
            urls.push(file.destination + "/" + file.filename)

        });
        console.log(req.files);

        await userModel.updateOne({ _id: req.user._id }, { coverPics: urls })
        res.status(200).json({ message: "Done", urls })
    }

}