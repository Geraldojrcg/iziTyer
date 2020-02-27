import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    description: String,
});