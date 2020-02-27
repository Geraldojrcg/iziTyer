import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorType } from './author.dto';
import { Author } from './author.interface';
import { AuthorInput } from './author.input';

@Injectable()
export class AuthorService {
    constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

    async create(createAuthor: AuthorInput): Promise<AuthorType> {
        return await this.authorModel.create(createAuthor);
    }

    async findAll(): Promise<AuthorType[]> {
        return await this.authorModel.find().exec();
    }

    async findOne(id: string): Promise<AuthorType> {
        return await this.authorModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<AuthorType> {
        return await this.authorModel.findByIdAndRemove(id);
    }

    async update(id: string, author: Author): Promise<AuthorType> {
        return await this.authorModel.findByIdAndUpdate(id, author, { new: true });
    }
}
