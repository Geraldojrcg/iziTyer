import { ObjectType, Field, Int, ID } from 'type-graphql';
import { AuthorType } from "../author/author.dto";

@ObjectType()
export class PostType {
    @Field(() => ID)
    readonly id?: string;
    @Field()
    readonly author: AuthorType;
    @Field(() => Int)
    readonly likes: number;
    @Field()
    readonly description: string;
}