import { Document } from 'mongoose';
import { Author } from "../author/author.interface";

export interface Post extends Document {
    readonly author: Author,
    readonly likes: number,
    readonly description: string,
}