import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const AdminCreateController = container.get('Admin.AdminCreateController');
    const AdminProfileController = container.get('Admin.AdminProfileController');

    //router.post("/api/admin", (...params) => AdminCreateController.run(...params));
    // router.put("/api/customer/:uid",
    //     isAuthenticated,
    //     isAuthorized({ hasRole: ['customer'] }),
    //     (...params) => customerUpdateController.run(...params));
    router.get("/api/admin/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['admin'] }),
        (...params) => AdminProfileController.run(...params));
}
