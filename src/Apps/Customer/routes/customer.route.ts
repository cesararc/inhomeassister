import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const customerSaveController = container.get('Customer.CustomerCreateController');
    const customerUpdateController = container.get('Customer.CustomerUpdateController');
    const customerProfileController = container.get('Customer.CustomerProfileController');

    router.post("/api/customer", (req: Request, res: Response) => customerSaveController.run(req, res));
    router.put("/api/customer", (req: Request, res: Response) => customerUpdateController.run(req, res));
    router.get("/api/customer/profile/:uid", (req: Request, res: Response) => customerProfileController.run(req, res));
}