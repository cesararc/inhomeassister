import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const contractCreateController = container.get('Contract.ContractCreateController');
    const contractRejectController = container.get('Contract.ContractRejectController');
    const contractApproveController = container.get('Contract.ContractApproveController');
    const contractUnverifiedController = container.get('Contract.ContractUnverifiedController');

    router.post("/api/contract",
        // isAuthenticated,
        // isAuthorized({ hasRole: ["seller"] }),
        (...params) => contractCreateController.run(...params));

    router.post("/api/contract/reject/:uid",
        // isAuthenticated,
        // isAuthorized({ hasRole: ["admin"] }),
        (...params) => contractRejectController.run(...params));

    router.post("/api/contract/approve/:uid",
        // isAuthenticated,
        // isAuthorized({ hasRole: ["admin"] }),
        (...params) => contractApproveController.run(...params));

    router.get("/api/contract/unverified/:uid",
        // isAuthenticated,
        // isAuthorized({ hasRole: ["seller"] }),
        (...params) => contractUnverifiedController.run(...params));
}