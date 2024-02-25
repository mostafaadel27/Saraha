import { Schema, model, Types } from 'mongoose'

const postSchema = new Schema({
    image: { type: String, required: true },
    caption: { type: String },
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    unlike: [{ type: Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
    totalCount: { type: Number, default: 0 }
}, {
    timestamps: true
})

export const postModel = model('Post', postSchema)