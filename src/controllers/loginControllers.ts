import { Router, Request, Response, NextFunction } from 'express';
import { get } from './decorators/routes'
import { controller } from './decorators/controller';

@controller('/auth')
class LoginController {

    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method="POST" action="/login">
                <div>
                    <label>Email</label>
                    <input type="text" name="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>
                <button>Login</button>
            </form>
        `)
    }
}