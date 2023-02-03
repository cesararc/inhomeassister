import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {

    const SearchController = container.get("CustomerRewardPoint.CustomerRewardPointSearchController");
    const IncrementController = container.get("CustomerRewardPoint.CustomerRewardPointIncrementController");

    router.post("/api/customer/reward-point",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => IncrementController.run(...params));
    router.get("/api/customer/reward-point/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["customer"] }),
        (...params) => SearchController.run(...params));
}