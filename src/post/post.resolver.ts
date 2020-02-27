import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './post.dto';
import { PostInput } from './post.input';

@Resolver('Post')
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @Query(() => [PostType])
    async posts(): Promise<PostType[]> {
        return this.postService.findAll();
    }

    @Mutation(() => PostType)
    async createPost(@Args('input') input: PostInput): Promise<PostType> {
        return this.postService.create(input);
    }

    @Mutation(() => PostType)
    async updatePost(@Args('id') id: string, @Args('input') input: PostInput): Promise<PostType> {
        return this.postService.update(id, input);
    }

    @Mutation(() => PostType)
    async deletePost(@Args('id') id: string): Promise<PostType> {
        return this.postService.delete(id);
    }
}
