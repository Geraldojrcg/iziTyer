import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PostType } from './post.dto';
import { Post } from './post.interface';
import { PostInput } from './post.input';
import { PostNotFoundException } from './post.exception';
import { MongoObjectIdException } from 'src/app.exception';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: mongoose.Model<Post>) { }

    async create(createPost: PostInput): Promise<PostType> {
        return await this.postModel.create(createPost);
    }

    async findAll(): Promise<PostType[]> {
        return await this.postModel.find().populate("author").exec();
    }

    async findPostsByAuthor(author: string): Promise<PostType[]> {
        if (!mongoose.Types.ObjectId.isValid(author)) {
            throw new MongoObjectIdException();
        }
        const posts: PostType[] = await this.postModel.find({ author }).populate("author").exec();
        if (!posts) {
            throw new PostNotFoundException();
        }
        return posts;
    }

    async findOne(id: string): Promise<PostType> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new MongoObjectIdException();
        }
        const post: PostType = await this.postModel.findOne({ _id: id });
        if (!post) {
            throw new PostNotFoundException();
        }
        return post;
    }

    async delete(id: string): Promise<PostType> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new MongoObjectIdException();
        }
        return await this.postModel.findByIdAndRemove(id);
    }

    async update(id: string, post: PostInput): Promise<PostType> {
        return await this.postModel.findByIdAndUpdate(id, post, { new: true });
    }

    async upvoteById(id: string): Promise<PostType> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new MongoObjectIdException();
        }
        const post = await this.postModel.findOne({ _id: id });
        if (!post) {
            throw new PostNotFoundException();
        }
        post.likes += 1;
        await post.save();
        return <PostType>post;
    }
}
