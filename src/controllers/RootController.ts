import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { get } from './decorators/routes';
import { controller } from './decorators/controller';
import { use } from './decorators/Use';

const requireAuth = (req: Request, res: Response, next: NextFunction): void =>{
    if (req.session && req.session.loggedIn){
        next();
        return;
    }
    res.status(403).send(`
        <div>
            <h1>Not permitted, Please login before</h1>
            <a href='/auth/login'>login</a>
        </div>
    `)
}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
                res.send(`
                <div>
                    <h1>You are logged in</h1>
                    <a href='/auth/logout'>Logout</a>
                    <a href='/protected'>Danger</a>
                </div>
            `)
        } else {
            res.send(`
                <div>
                    <h1>You are not logged in</h1>
                    <a href='/auth/login'>Login</a>
                </div>
            `)

        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route, logged in user')
    }
}