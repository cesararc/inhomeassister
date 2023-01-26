import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const contractCreateController = container.get('Contract.ContractCreateController');
    const contractUnverifiedController = container.get('Contract.ContractUnverifiedController');

    router.post("/api/contract",
        // isAuthenticated,
        // isAuthorized({ hasRole: ["seller"] }),
        (...params) => contractCreateController.run(...params));

    router.get("/api/contract/unverified/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["seller"] }),
        (...params) => contractUnverifiedController.run(...params));
}