import { RoutesInput } from '@/types/types'
import { Request, Response, NextFunction } from 'express';

export default ({ app }: RoutesInput) => {
    app.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.render('index', {urlAccount: process.env.URL_ACCOUNT});
        } catch (e) {
            throw(e);
        }
    });
    app.get('/pricing', async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.render('pricing', {urlAccount: process.env.URL_ACCOUNT});
        } catch (e) {
            throw(e);
        }
    });
};