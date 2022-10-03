import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';
import { SellerCreateController } from '../controllers/SellerCreateController';

export const register = (router: Router) => {
    const customerSaveController = container.get<SellerCreateController>('Seller.SellerCreateController');

    router.post("/api/seller", (req: Request, res: Response) => customerSaveController.run(req, res));
}