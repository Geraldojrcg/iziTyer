import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [AuthorModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }
