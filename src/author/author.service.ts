import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuthorType } from './author.dto';
import { Author } from './author.interface';
import { AuthorInput } from './author.input';
import { AuthorNotFoundException } from './author.exception';
import { MongoObjectIdException } from 'src/app.exception';

@Injectable()
export class AuthorService {
    constructor(@InjectModel('Author') private authorModel: mongoose.Model<Author>) { }

    async create(createAuthor: AuthorInput): Promise<AuthorType> {
        const authors = await this.findAll();
        if (authors.some(author => author.email === createAuthor.email)) {
            throw new Error("Email already in use");
        }
        return await this.authorModel.create(createAuthor);
    }

    async findAll(): Promise<AuthorType[]> {
        return await this.authorModel.find().exec();
    }

    async findOne(id: string): Promise<AuthorType> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new MongoObjectIdException();
        }
        const author: AuthorType = await this.authorModel.findOne({ _id: id });
        if (!author) {
            throw new AuthorNotFoundException();
        }
        return author;
    }

    async findByEmail(email: string): Promise<AuthorType> {
        const author: AuthorType = await this.authorModel.findOne({ email });
        if (!author) {
            throw new AuthorNotFoundException();
        }
        return author;
    }

    async delete(id: string): Promise<AuthorType> {
        return await this.authorModel.findByIdAndRemove(id);
    }

    async update(id: string, author: Author): Promise<AuthorType> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new MongoObjectIdException();
        }
        const authorRes: AuthorType = await this.authorModel.findByIdAndUpdate(id, author, { new: true });
        if (!authorRes) {
            throw new AuthorNotFoundException;
        }
        return authorRes;
    }
}
