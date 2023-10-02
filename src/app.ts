import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';
import { Liquid } from 'liquidjs'
import 'dotenv/config'
import path from 'path';

const engine = new Liquid({
    extname: '.liquid',
    jsTruthy: true,
    cache: process.env.NODE_ENV === 'production'
});

import Routes from "./routes";

const app: express.Application = express();
const server = http.createServer(app);

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
}

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('./public'));

app.engine('liquid', engine.express()); 
app.set('views', [
    path.join(__dirname, '/views'),
    path.join(__dirname, '/views/pages'),
    path.join(__dirname, '/views/snippets'),
]);
app.set('view engine', 'liquid');

Routes({ app });

app.use((req: Request, res: Response): void => {
    res.status(404).json({error: 'Not Found'});
});
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    next(err);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json({error: 'Something broke!'});
});

app.set('port', process.env.PORT);

server.listen(app.get('port'));