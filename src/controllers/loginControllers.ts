import { Router, Request, Response, NextFunction } from 'express';
import { get, post } from './decorators/routes'
import { controller } from './decorators/controller';
import { use } from './decorators/Use';
import { BodyValidator } from './decorators/BodyValidator';

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method="POST">
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

    @post('/login')
    @BodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body 
        
        if (email && password && email === 'baah@mail.com' && password === 'baah') {
            req.session = {loggedIn: true}
            res.redirect('/')
        } else {
            res.send('Invalid Email')
        }
    };
} 