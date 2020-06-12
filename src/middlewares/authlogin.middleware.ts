import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthLoginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if (req.session.isLogin === true) {
            next()
        }
        else {
            res.status(401).send({
                message: '请先登录'
            })
        }
    }
}