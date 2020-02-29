import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';
import { MongoObjectIdException } from 'src/app.exception';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    MongoObjectIdException
  ],
  providers: [PostResolver, PostService]
})
export class PostModule { }
