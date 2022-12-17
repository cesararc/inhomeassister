import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const serviceProviderCreateController = container.get('ServiceProvider.ServiceProviderCreateController');
    const serviceProviderUpdateController = container.get('ServiceProvider.ServiceProviderUpdateController');
    const serviceProviderProfileController = container.get('ServiceProvider.ServiceProviderProfileController');

    router.post("/api/service-provider", (req: Request, res: Response) => serviceProviderCreateController.run(req, res));
    router.put("/api/service-provider/:uid", (req: Request, res: Response) => serviceProviderUpdateController.run(req, res));
    router.get("/api/service-provider/profile/:uid", (req: Request, res: Response) => serviceProviderProfileController.run(req, res));
}