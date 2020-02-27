import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class AuthorInput {
    @Field(() => ID)
    readonly id?: string;
    @Field()
    readonly name: string;
    @Field(() => Int)
    readonly age: number;
    @Field()
    readonly email: string;
    @Field()
    readonly description: string;
}