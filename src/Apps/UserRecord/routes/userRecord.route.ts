import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';

export const register = (router: Router) => {
    const UserRecordProfileController = container.get('UserRecord.UserRecordProfileController');
    const UserRecordResetPasswordController = container.get('UserRecord.UserRecordResetPasswordController');
    const UserRecordDisableController = container.get('UserRecord.UserRecordDisableController');
    const UserRecordEnableController = container.get('UserRecord.UserRecordEnableController');

    router.get("/api/user-record/profile/:uid", isAuthenticated, (...params) => UserRecordProfileController.run(...params));
    router.post("/api/user-record/enable/:uid", isAuthenticated, (...params) => UserRecordEnableController.run(...params));
    router.post("/api/user-record/disable/:uid", isAuthenticated, (...params) => UserRecordDisableController.run(...params));
    router.post("/api/user-record/reset-password/:email", (...params) => UserRecordResetPasswordController.run(...params));
}