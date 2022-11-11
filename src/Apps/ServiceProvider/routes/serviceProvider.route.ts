import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const serviceProviderCreateController = container.get('ServiceProvider.ServiceProviderCreateController');

    router.post("/api/service_provider", (req: Request, res: Response) => serviceProviderCreateController.run(req, res));
}