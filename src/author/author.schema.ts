import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const AuthorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    description: String,
    password: String
});

AuthorSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});

AuthorSchema.pre('findOneAndUpdate', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});