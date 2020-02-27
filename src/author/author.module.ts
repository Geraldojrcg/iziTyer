import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { AuthorSchema } from './author.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
  providers: [AuthorService]
})
export class AuthorModule { }
