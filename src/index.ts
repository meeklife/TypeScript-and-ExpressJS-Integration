import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';

import './controllers/loginControllers';
import './controllers/RootController';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({keys: ['Thisismycookie']}))

app.use(AppRouter.getInstance())

app.listen(3000, () => {
    console.log('listening on port 3000')
})