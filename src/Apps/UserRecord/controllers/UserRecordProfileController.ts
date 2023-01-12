import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { UserRecordProfileQuery } from '../../../Contexts/UserRecord/application/accountProfile/UserRecordProfileQuery';
import { UserRecordProfileResponse } from '../../../Contexts/UserRecord/application/accountProfile/UserRecordProfileResponse';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';

export class UserRecordProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const userRecordQuery = new UserRecordProfileQuery(uid);

            const { userRecord }: UserRecordProfileResponse = await this.query.ask(userRecordQuery);

            res.status(httpStatus.OK).send(this.toResponse(userRecord));

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

    }

    private toResponse(userRecord: UserRecord) {
        return {
            email: userRecord.email.toString(),
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
            claim: userRecord.claim.value
        };
    }
}