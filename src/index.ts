import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';

import { router } from './routes/login';
import './controllers/loginControllers';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({keys: ['Thisismycookie']}))

app.use(router)
app.use(AppRouter.getInstance())

app.listen(3000, () => {
    console.log('listening on port 3000')
})