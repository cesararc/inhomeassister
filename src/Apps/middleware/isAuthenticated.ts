import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { auth } from '../database';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");

        if (!authorization.startsWith('Bearer')) return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");

        const split = authorization.split('Bearer ')
        if (split.length !== 2) return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");

        const token = split[1];

        const decoded = await auth.verifyIdToken(token, true);
        res.locals = { ...res.locals, uid: decoded.uid, role: decoded.role, email: decoded.email };

        return next();

    } catch (error) {
        if (error.code === "auth/id-token-revoked") {
            return res.status(httpStatus.UNAUTHORIZED).send("Session has been revoked.");
        }

        return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");
    }

}

export { isAuthenticated }