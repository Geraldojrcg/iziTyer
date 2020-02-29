import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { AuthorSchema } from './author.schema';
import { AuthorResolver } from './author.resolver';
import { AuthorNotFoundException } from './author.exception';
import { MongoObjectIdException } from 'src/app.exception';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    MongoObjectIdException
  ],
  providers: [AuthorResolver, AuthorService, AuthorNotFoundException],
  exports: [AuthorService, AuthorNotFoundException]
})
export class AuthorModule { }
