import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const customerSaveController = container.get('Customer.CustomerCreateController');
    const customerUpdateController = container.get('Customer.CustomerUpdateController');
    const customerProfileController = container.get('Customer.CustomerProfileController');

    router.post("/api/customer", (...params) => customerSaveController.run(...params));
    router.put("/api/customer/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['customer'] }),
        (...params) => customerUpdateController.run(...params));
    router.get("/api/customer/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['customer'] }),
        (...params) => customerProfileController.run(...params));
}
