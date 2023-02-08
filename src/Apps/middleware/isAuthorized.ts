import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export function isAuthorized(opts: { hasRole: Array<'customer' | 'service_provider' | 'seller' | "admin"> }) {
    return (_: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals;

        if (!role) {
            return res.status(httpStatus.FORBIDDEN).json(
                {
                    statusCode: httpStatus.FORBIDDEN,
                    message: "You do not have permissions for this resource"
                }
            );
        }

        if (opts.hasRole.includes(role)) {
            return next();
        }

        return res.status(httpStatus.FORBIDDEN).json(
            {
                statusCode: httpStatus.FORBIDDEN,
                message: "You do not have permissions for this resource"
            }
        );
    }
}