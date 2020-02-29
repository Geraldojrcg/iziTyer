import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorType } from './author.dto';
import { AuthorInput } from './author.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) { }

    @Query(() => [AuthorType])
    async authors(): Promise<AuthorType[]> {
        return this.authorService.findAll();
    }

    @Query(() => AuthorType)
    async author(@Args('authorId') id: string): Promise<AuthorType> {
        return this.authorService.findOne(id);
    }

    @Query(() => AuthorType)
    async authorById(@Args('id') id: string): Promise<AuthorType> {
        return this.authorService.findOne(id);
    }

    @Mutation(() => AuthorType)
    async createAuthor(@Args('input') input: AuthorInput): Promise<AuthorInput> {
        return this.authorService.create(input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => AuthorType)
    async updateAuthor(@Args('id') id: string, @Args('input') input: AuthorInput): Promise<AuthorInput> {
        return this.authorService.update(id, input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => AuthorType)
    async deleteAuthor(@Args('id') id: string): Promise<AuthorInput> {
        return this.authorService.delete(id);
    }
}
