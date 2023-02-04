import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const ServiceProviderCreateController = container.get('ServiceProvider.ServiceProviderCreateController');
    const ServiceProviderUpdateController = container.get('ServiceProvider.ServiceProviderUpdateController');
    const ServiceProviderProfileController = container.get('ServiceProvider.ServiceProviderProfileController');

    router.post("/api/service_provider", (...params) => ServiceProviderCreateController.run(...params));
    router.put("/api/service_provider/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ['service_provider'] }),
        (...params) => ServiceProviderUpdateController.run(...params));
    router.get("/api/service_provider/profile/:uid",
        // isAuthenticated,
        // isAuthorized({ hasRole: ['service_provider'] }),
        (...params) => ServiceProviderProfileController.run(...params));
}