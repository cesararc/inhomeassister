import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export function isAuthorized(opts: { hasRole: Array<'customer' | 'service_provider' | 'seller' | "admin"> }) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals;

        if (!role)
            return res.sendStatus(httpStatus.FORBIDDEN);

        if (opts.hasRole.includes(role))
            return next();

        return res.sendStatus(httpStatus.FORBIDDEN);
    }
}