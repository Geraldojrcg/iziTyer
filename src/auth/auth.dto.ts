import { ObjectType, Field } from 'type-graphql';
import { AuthorType } from 'src/author/author.dto';

@ObjectType()
export class AuthType {
    @Field()
    token: string;
    @Field()
    author: AuthorType;
}