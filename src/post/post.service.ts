import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostType } from './post.dto';
import { Post } from './post.interface';
import { PostInput } from './post.input';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: Model<Post>) {}

    async create(createPost: PostInput): Promise<PostType> {
        return await this.postModel.create(createPost);
    }

    async findAll(): Promise<PostType[]> {
        return await this.postModel.find().exec();
    }

    async findOne(id: string): Promise<PostType> {
        return await this.postModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<PostType> {
        return await this.postModel.findByIdAndRemove(id);
    }

    async update(id: string, post: PostInput): Promise<PostType> {
        return await this.postModel.findByIdAndUpdate(id, post, { new: true });
    }
}
