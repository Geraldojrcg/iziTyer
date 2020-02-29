import { Injectable } from '@nestjs/common';
import { AuthType } from './auth.dto';
import { AuthInput } from './auth.input';
import { AuthorService } from 'src/author/author.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/auth.config';
import { AuthorNotFoundException } from 'src/author/author.exception';
import { PasswordIncorrectException } from './auth.exception';

@Injectable()
export class AuthService {
    constructor(private authorService: AuthorService) { }

    async login(input: AuthInput): Promise<AuthType> {
        const author = await this.authorService.findByEmail(input.email);
        if (!author) {
            throw new AuthorNotFoundException();
        }
        if (!await bcrypt.compare(input.password, author.password)) {
            throw new PasswordIncorrectException();
        }
        const auth = new AuthType();
        auth.author = author;
        auth.token = this.generateToken(author.id);
        return auth;
    }

    generateToken(authorId: string): any {
        return jwt.sign({ authorId }, authConfig.secret, {
            expiresIn: 5184000
        });
    }
}
