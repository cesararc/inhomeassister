import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { auth } from '../database';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    try {
        if (!authorization) return res.status(httpStatus.UNAUTHORIZED).send("UNAUTHORIZED");

        if (!authorization.startsWith('Bearer')) return res.status(httpStatus.UNAUTHORIZED).send("UNAUTHORIZED");

        const split = authorization.split('Bearer ')
        if (split.length !== 2) return res.status(httpStatus.UNAUTHORIZED).send("UNAUTHORIZED");

        const token = split[1];

        const decodedToken = await auth.verifyIdToken(token);
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };

        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send("UNAUTHORIZED");
    }

}

export { isAuthenticated }