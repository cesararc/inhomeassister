import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const userRecordProfileController = container.get('UserRecord.UserRecordProfileController');
    const userRecordResetPasswordController = container.get('UserRecord.UserRecordResetPasswordController');
    const userRecordDisableController = container.get('UserRecord.UserRecordDisableController');
    const userRecordEnableController = container.get('UserRecord.UserRecordEnableController');

    router.get("/api/user-record/profile/:uid", (req: Request, res: Response) => userRecordProfileController.run(req, res));
    router.post("/api/user-record/enable/:uid", (req: Request, res: Response) => userRecordEnableController.run(req, res));
    router.post("/api/user-record/disable/:uid", (req: Request, res: Response) => userRecordDisableController.run(req, res));
    router.post("/api/user-record/reset-password/:email", (req: Request, res: Response) => userRecordResetPasswordController.run(req, res));
}