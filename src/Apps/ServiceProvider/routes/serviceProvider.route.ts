import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const serviceProviderCreateController = container.get('ServiceProvider.ServiceProviderCreateController');
    const serviceProviderUpdateController = container.get('ServiceProvider.ServiceProviderUpdateController');
    const serviceProviderProfileController = container.get('ServiceProvider.ServiceProviderProfileController');

    router.post("/api/service_provider", (...params) => serviceProviderCreateController.run(...params));
    router.put("/api/service-provider/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['service_provider'] }),
        (...params) => serviceProviderUpdateController.run(...params));
    router.get("/api/service_provider/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['service_provider'] }),
        (...params) => serviceProviderProfileController.run(...params));
}