import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorResolver } from './author/author.resolver';
import { PostResolver } from './post/post.resolver';
import { PostModule } from './post/post.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot('mongodb://localhost/izityer'),
    AuthorModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorResolver, PostResolver],
})
export class AppModule {}
