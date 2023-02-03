import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { UserRecordProfileQuery } from '../../../Contexts/UserRecord/application/Profile/UserRecordProfileQuery';
import { UserRecordProfileResponse } from '../../../Contexts/UserRecord/application/Profile/UserRecordProfileResponse';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';
import { UserRecordNotFound } from '../../../Contexts/UserRecord/domain/UserRecordNotFound';
import { AdminProfileQuery } from '../../../Contexts/Admin/application/profile/AdminProfileQuery';
import { AdminProfileResponse } from '../../../Contexts/Admin/application/profile/AdminProfileResponse';
import { Admin } from '../../../Contexts/Admin/domain/Admin';

export class AdminProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {

        const uid = req.params.uid;

        try {
            const userRecordQuery = new UserRecordProfileQuery(uid);

            const adminProfileQuery = new AdminProfileQuery(uid);

            const { userRecord }: UserRecordProfileResponse = await this.query.ask(userRecordQuery);

            const { admin }: AdminProfileResponse = await this.query.ask(adminProfileQuery);

            res.status(httpStatus.OK).send(this.toResponse(userRecord, admin));

        } catch (error) {
            if (error instanceof UserRecordNotFound) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            }

            res.status(httpStatus.NOT_FOUND).send(error.message);
        }
    }

    private toResponse(userRecord: UserRecord, admin: Admin) {
        return {
            uid: admin.uid.toString(),
            dni: admin.dni.value,
            email: userRecord.email.toString(),
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
            claim: userRecord.claim.value
        };
    }
}