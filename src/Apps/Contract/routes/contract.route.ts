import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const ContractCreateController = container.get('Contract.ContractCreateController');
    const ContractRejectController = container.get('Contract.ContractRejectController');
    const ContractApproveController = container.get('Contract.ContractApproveController');
    const ContractProductionController = container.get('Contract.ContractProductionController');
    const ContractUnverifiedController = container.get('Contract.ContractUnverifiedController');

    router.post("/api/contract",
        isAuthenticated,
        isAuthorized({ hasRole: ["seller"] }),
        (...params) => ContractCreateController.run(...params));

    router.post("/api/contract/reject/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => ContractRejectController.run(...params));

    router.post("/api/contract/approve/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => ContractApproveController.run(...params));

    router.post("/api/contract/production/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => ContractProductionController.run(...params));

    router.get("/api/contract/unverified/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["seller"] }),
        (...params) => ContractUnverifiedController.run(...params));
}