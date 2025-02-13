import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import helmet from "helmet";
// import csrf from 'csurf';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import * as http from 'http';
import { Request, NextFunction, Response } from 'express';
import { registerRoutes } from './routes';

export class Server {

    private express: express.Express;
    public httpServer?: http.Server;
    private port: string;

    constructor(port: string) {
        this.port = port;
        this.express = express();
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json());
        this.express.use(cookieParser("session"));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        const router = Router();
        router.use(cors());
        router.use(errorHandler());
        this.express.use(router);

        registerRoutes(router);

        router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }

    async listen(): Promise<void> {
        return new Promise(resolve => {
            this.httpServer = this.express.listen(this.port, () => {
                console.log(`🚀 Server listening on port ${this.port}`);
                resolve();
            });
        });
    }
}
