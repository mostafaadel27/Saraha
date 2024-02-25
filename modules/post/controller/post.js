import { postModel } from "../../../DB/model/post.model.js"
import cloudinary from '../../../service/cloudinary.js'


export const addPost = async (req, res) => {

    if (!req.file) {
        res.status(400).json({ message: "Plz upload u file" })
    } else {

        const { caption } = req.body
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `Gallary/${req.user._id}` })
        const newPost = new postModel({ image: secure_url, caption, userId: req.user._id })
        const savedPost = await newPost.save()
        res.status(201).json({ message: "Done", savedPost })
    }
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    const post = await postModel.updateOne({ _id: id, likes: { $nin: req.user._id } },
        {
            $push: { likes: req.user._id },
            $pull: { unlike: req.user._id },
            $inc: { totalCount: 1 }
        })
    res.status(200).json({ message: "Done", post })
}



export const unlikePost = async (req, res) => {
    const { id } = req.params;

    const findPost = await postModel.findOne({ _id: id, unlike: { $nin: req.user._id } })
    if (!findPost) {
        res.json({message:"Alrady unlike"})
    } else {
        const post = await postModel.updateOne({ _id: id, unlike: { $nin: req.user._id } },
            {
                $push: { unlike: req.user._id },
                $pull: { likes: req.user._id },
                // $inc: { totalCount: -1 }
            })
    
        res.status(200).json({ message: "Done", post })
    }

}