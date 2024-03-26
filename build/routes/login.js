"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const requireAuth = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send(`
        <div>
            <h1>Not permitted, Please login before</h1>
            <a href='/auth/login'>login</a>
        </div>
    `);
};
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <h1>You are logged in</h1>
            <a href='/logout'>Logout</a>
            <a href='/protected'>Danger</a>
        </div>
    `);
    }
    else {
        res.send(`
        <div>
            <h1>You are not logged in</h1>
            <a href='/auth/login'>Login</a>
        </div>
    `);
    }
});
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
// router.post('/login', (req: RequestWithBody, res: Response) => {
//     const { email, password } = req.body 
//     if (email && password && email === 'baah@mail.com' && password === 'baah') {
//         req.session = {loggedIn: true}
//         res.redirect('/')
//     } else {
//         res.send('Invalid Email')
//     }
// })
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route, logged in user');
});
