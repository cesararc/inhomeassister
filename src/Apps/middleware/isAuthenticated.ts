import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { auth } from '../database';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    try {
        if (!authorization) res.sendStatus(httpStatus.UNAUTHORIZED);

        if (!authorization.startsWith('Bearer')) res.sendStatus(httpStatus.UNAUTHORIZED);

        const split = authorization.split('Bearer ')
        if (split.length !== 2) res.sendStatus(httpStatus.UNAUTHORIZED);

        const token = split[1];

        const decodedToken = await auth.verifyIdToken(token);
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };

        next();
    } catch (error) {
        res.sendStatus(httpStatus.UNAUTHORIZED);
    }

}

export { isAuthenticated }