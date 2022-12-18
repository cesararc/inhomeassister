import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {

    const customerRewardPointSearch = container.get("CustomerRewardPoint.CustomerRewardPointSearchController");
    const customerRewardPointIncrement = container.get("CustomerRewardPoint.CustomerRewardPointIncrementController");

    router.post("/api/customer-reward-point", (req: Request, res: Response) => customerRewardPointIncrement.run(req, res));
    router.get("/api/customer-reward-point/:uid", (req: Request, res: Response) => customerRewardPointSearch.run(req, res));
}