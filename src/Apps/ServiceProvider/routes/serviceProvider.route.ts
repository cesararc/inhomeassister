import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';
import { ServiceProviderCreateController } from '../controllers/ServiceProviderCreateController';

export const register = (router: Router) => {
    const serviceProviderCreateController = container.get<ServiceProviderCreateController>('ServiceProvider.ServiceProviderCreateController');

    router.post("/api/service-provider", (req: Request, res: Response) => serviceProviderCreateController.run(req, res));
}