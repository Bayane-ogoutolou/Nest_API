import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest <Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException('unauthorized');
        }
        if (token !== 'mysecrettoken') {
          throw new UnauthorizedException('invalid token');
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined { 
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined; 
    }
}