import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {

    router.post("/api/customer-reward-point", (req: Request, res: Response) => customerSaveController.run(req, res));
    router.get("/api/customer-reward-point/:uid", (req: Request, res: Response) => customerUpdateController.run(req, res));
}