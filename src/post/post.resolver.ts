import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType, PostTypeEmbedded } from './post.dto';
import { PostInput, UpvotePostInput } from './post.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver('Post')
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @Query(() => [PostType])
    async posts(): Promise<PostType[]> {
        return await this.postService.findAll();
    }

    @Query(() => PostType)
    async postById(@Args('id') id: string): Promise<PostType> {
        return await this.postService.findOne(id);
    }

    @Query(() => [PostType])
    async postsByAuthor(@Args('authorId') authorId: string): Promise<PostType[]> {
        return await this.postService.findPostsByAuthor(authorId);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => PostTypeEmbedded)
    async createPost(@Args('input') input: PostInput): Promise<PostType> {
        return await this.postService.create(input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => PostType)
    async updatePost(@Args('id') id: string, @Args('input') input: PostInput): Promise<PostType> {
        return await this.postService.update(id, input);
    }

    @Mutation(() => PostType)
    async upvotePostById(@Args('input') input: UpvotePostInput): Promise<PostType> {
        return await this.postService.upvoteById(input.postId);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => PostType)
    async deletePost(@Args('id') id: string): Promise<PostType> {
        return await this.postService.delete(id);
    }
}
