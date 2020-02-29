import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import authConfig from './config/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;

    const [scheme, token] = req.headers.authorization.split(" ");

    if (!/^Bearer$/i.test(scheme)) return false;

    const decoded: any = jwt.verify(token, authConfig.secret);

    if (decoded) return true;

    return false;
  }
}
