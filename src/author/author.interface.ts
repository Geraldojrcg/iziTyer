import { Document } from 'mongoose';

export interface Author extends Document {
    readonly name: string,
    readonly age: number,
    readonly email: string,
    readonly description: string,
}