import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const userRecordProfileController = container.get('UserRecord.UserRecordProfileController');
    const userRecordResetPasswordController = container.get('UserRecord.UserRecordResetPasswordController');

    router.get("/api/user-record/profile/:uid", (req: Request, res: Response) => userRecordProfileController.run(req, res));
    router.post("/api/user-record/reset-password/:email", (req: Request, res: Response) => userRecordResetPasswordController.run(req, res));
}