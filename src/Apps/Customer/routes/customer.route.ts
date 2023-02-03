import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const CustomerSaveController = container.get('Customer.CustomerCreateController');
    const CustomerUpdateController = container.get('Customer.CustomerUpdateController');
    const CustomerProfileController = container.get('Customer.CustomerProfileController');

    router.post("/api/customer", (...params) => CustomerSaveController.run(...params));
    router.put("/api/customer/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['customer'] }),
        (...params) => CustomerUpdateController.run(...params));
    router.get("/api/customer/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['customer'] }),
        (...params) => CustomerProfileController.run(...params));
}
