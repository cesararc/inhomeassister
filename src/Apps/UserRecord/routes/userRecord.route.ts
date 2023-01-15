import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';

export const register = (router: Router) => {
    const userRecordProfileController = container.get('UserRecord.UserRecordProfileController');
    const userRecordResetPasswordController = container.get('UserRecord.UserRecordResetPasswordController');
    const userRecordDisableController = container.get('UserRecord.UserRecordDisableController');
    const userRecordEnableController = container.get('UserRecord.UserRecordEnableController');

    router.get("/api/user-record/profile/:uid", isAuthenticated, (...params) => userRecordProfileController.run(...params));
    router.post("/api/user-record/enable/:uid", isAuthenticated, (...params) => userRecordEnableController.run(...params));
    router.post("/api/user-record/disable/:uid", isAuthenticated, (...params) => userRecordDisableController.run(...params));
    router.post("/api/user-record/reset-password/:email", isAuthenticated, (...params) => userRecordResetPasswordController.run(...params));
}