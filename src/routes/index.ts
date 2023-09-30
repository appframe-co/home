import { RoutesInput } from '@/types/types'
import { Request, Response, NextFunction } from 'express';

export default ({ app }: RoutesInput) => {
    app.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send('home page')
        } catch (e) {
            throw(e);
        }
    });
};