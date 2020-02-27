import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorType } from './author.dto';
import { AuthorInput } from './author.input';

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) { }

    @Query(() => [AuthorType])
    async authors(): Promise<AuthorType[]> {
        return this.authorService.findAll();
    }

    @Mutation(() => AuthorType)
    async createAuthor(@Args('input') input: AuthorInput): Promise<AuthorInput> {
        return this.authorService.create(input);
    }

    @Mutation(() => AuthorType)
    async updateAuthor(@Args('id') id: string, @Args('input') input: AuthorInput): Promise<AuthorInput> {
        return this.authorService.update(id, input);
    }

    @Mutation(() => AuthorType)
    async deleteAuthor(@Args('id') id: string): Promise<AuthorInput> {
        return this.authorService.delete(id);
    }
}
