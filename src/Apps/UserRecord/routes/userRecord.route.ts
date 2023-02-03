import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';

export const register = (router: Router) => {
    const UserRecordProfileController = container.get('UserRecord.UserRecordProfileController');
    const UserRecordResetPasswordController = container.get('UserRecord.UserRecordResetPasswordController');
    const UserRecordDisableController = container.get('UserRecord.UserRecordDisableController');
    const UserRecordEnableController = container.get('UserRecord.UserRecordEnableController');

    router.get("/api/user-record/profile/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin", "customer", "seller", "service_provider"] }),
        (...params) => UserRecordProfileController.run(...params));
    router.post("/api/user-record/enable/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => UserRecordEnableController.run(...params));
    router.post("/api/user-record/disable/:uid",
        isAuthenticated,
        isAuthorized({ hasRole: ["admin"] }),
        (...params) => UserRecordDisableController.run(...params));
    router.post("/api/user-record/reset-password/:email", (...params) => UserRecordResetPasswordController.run(...params));
}