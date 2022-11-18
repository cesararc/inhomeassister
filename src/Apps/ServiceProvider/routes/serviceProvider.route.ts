import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const serviceProviderCreateController = container.get('ServiceProvider.ServiceProviderCreateController');

    const serviceProviderProfileController = container.get('ServiceProvider.ServiceProviderProfileController');

    router.post("/api/service_provider", (req: Request, res: Response) => serviceProviderCreateController.run(req, res));
    router.get("/api/service_provider/profile/:uid", (req: Request, res: Response) => serviceProviderProfileController.run(req, res));
}