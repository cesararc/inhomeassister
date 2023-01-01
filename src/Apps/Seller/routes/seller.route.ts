import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const sellerCreateController = container.get('Seller.SellerCreateController');
    const sellerUpdateController = container.get('Seller.SellerUpdateController');
    const sellerProfileController = container.get('Seller.SellerProfileController');

    router.post("/api/seller", (...params) => sellerCreateController.run(...params));
    router.put("/api/seller/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['seller'] }),
        (...params) => sellerUpdateController.run(...params));
    router.get("/api/seller/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['seller'] }),
        (...params) => sellerProfileController.run(...params));
}