import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';
import { CustomerCreateController } from '../controllers/CustomerCreateController';

export const register = (router: Router) => {
    const customerSaveController = container.get<CustomerCreateController>('Customer.CustomerCreateController');

    router.post("/api/customer", (req: Request, res: Response) => customerSaveController.run(req, res));
}