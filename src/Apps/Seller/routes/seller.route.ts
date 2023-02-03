import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const SellerCreateController = container.get('Seller.SellerCreateController');
    const SellerUpdateController = container.get('Seller.SellerUpdateController');
    const SellerProfileController = container.get('Seller.SellerProfileController');

    router.post("/api/seller", (...params) => SellerCreateController.run(...params));
    router.put("/api/seller/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['seller'] }),
        (...params) => SellerUpdateController.run(...params));
    router.get("/api/seller/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['seller'] }),
        (...params) => SellerProfileController.run(...params));
}