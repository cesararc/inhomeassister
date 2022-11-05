import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const userRecordProfileController = container.get('UserRecord.UserRecordProfileController');

    router.get("/api/user-record/profile/:uid", (req: Request, res: Response) => userRecordProfileController.run(req, res));
}