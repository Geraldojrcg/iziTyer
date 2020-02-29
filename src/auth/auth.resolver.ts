import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthType } from './auth.dto';
import { AuthInput } from './auth.input';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthType)
    async login(@Args('input') input: AuthInput): Promise<AuthType> {
        return this.authService.login(input);
    }
}
