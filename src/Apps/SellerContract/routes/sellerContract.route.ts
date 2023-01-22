import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const sellerContractCreateController = container.get('SellerContract.SellerContractCreateController');

    router.post("/api/sellerContract",
        //isAuthenticated,
        //isAuthorized({ hasRole: ["seller"] }),
        (...params) => sellerContractCreateController.run(...params));
}