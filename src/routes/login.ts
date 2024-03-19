import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined}
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void =>{
    if (req.session && req.session.loggedIn){
        next();
        return;
    }
    res.status(403).send('Not permitted, Please login before')
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
   if (req.session && req.session.loggedIn) {
         res.send(`
        <div>
            <h1>You are logged in</h1>
            <a href='/logout'>Logout</a>
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
})

// router.get('/login', (req: Request, res: Response) => {
//     res.send(`
//         <form method="POST" action="/login">
//             <div>
//                 <label>Email</label>
//                 <input type="text" name="email"/>
//             </div>
//             <div>
//                 <label>Password</label>
//                  <input type="password" name="password"/>
//             </div>
//             <button>Login</button>
//         </form>
//     `)
// })

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body 
    
    if (email && password && email === 'baah@mail.com' && password === 'baah') {
        req.session = {loggedIn: true}
        res.redirect('/')
    } else {
        res.send('Invalid Email')
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user')
})

export { router}