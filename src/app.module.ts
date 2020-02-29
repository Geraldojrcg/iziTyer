import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './auth/auth.module';
import { MongoObjectIdException } from './app.exception';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req })
    }),
    MongooseModule.forRoot('mongodb://localhost/izityer', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AuthorModule,
    PostModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MongoObjectIdException],
  exports: [MongoObjectIdException]
})
export class AppModule { }
