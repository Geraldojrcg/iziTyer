import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    description: String,
    likes: Number
});