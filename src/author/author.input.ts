import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class AuthorInput {
    @Field()
    readonly name: string;
    @Field(() => Int)
    readonly age: number;
    @Field()
    readonly email: string;
    @Field()
    readonly description: string;
}