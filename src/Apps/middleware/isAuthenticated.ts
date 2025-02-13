import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { auth } from '../database';

export const isAuthenticated = async function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return res.status(httpStatus.UNAUTHORIZED).json(
                {
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "Unauthorized"
                }
            );
        }

        if (!authorization.startsWith('Bearer')) {
            return res.status(httpStatus.UNAUTHORIZED).json(
                {
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "Unauthorized"
                }
            );
        }

        const split = authorization.split('Bearer ')
        if (split.length !== 2) {
            return res.status(httpStatus.UNAUTHORIZED).json(
                {
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "Unauthorized"
                }
            );
        }

        const token = split[1];

        const decoded = await auth.verifyIdToken(token, true);
        res.locals = { ...res.locals, uid: decoded.uid, role: decoded.role, email: decoded.email };

        return next();

    } catch (error) {
        if (error.code === "auth/id-token-revoked") {
            return res.status(httpStatus.UNAUTHORIZED).json(
                {
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "Session has been revoked."
                }
            );
        }

        return res.status(httpStatus.UNAUTHORIZED).json(
            {
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unauthorized"
            }
        );
    }
}