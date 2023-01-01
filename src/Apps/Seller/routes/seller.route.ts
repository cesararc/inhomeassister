import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const sellerCreateController = container.get('Seller.SellerCreateController');
    const sellerUpdateController = container.get('Seller.SellerUpdateController');
    const sellerProfileController = container.get('Seller.SellerProfileController');

    router.post("/api/seller", (req: Request, res: Response) => sellerCreateController.run(req, res));
    router.put("/api/seller/:uid", (req: Request, res: Response) => sellerUpdateController.run(req, res));
    router.get("/api/seller/profile/:uid", (req: Request, res: Response) => sellerProfileController.run(req, res));
}