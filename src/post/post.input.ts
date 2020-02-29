import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class PostInput {
    @Field()
    readonly author: string;
    @Field(() => Int)
    readonly likes: number;
    @Field()
    readonly description: string;
}

@InputType()
export class UpvotePostInput {
  @Field() postId: string;
}