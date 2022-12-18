import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerProfileQuery } from '../../../Contexts/Customer/Customer/application/profile/CustomerProfileQuery';
import { CustomerProfileResponse } from '../../../Contexts/Customer/Customer/application/profile/CustomerProfileResponse';
import { Customer } from '../../../Contexts/Customer/Customer/domain/Customer';
import { CustomerNotFound } from '../../../Contexts/Customer/Customer/domain/CustomerNotFound';
import { UserRecordProfileQuery } from '../../../Contexts/UserRecord/application/accountProfile/UserRecordProfileQuery';
import { UserRecordProfileResponse } from '../../../Contexts/UserRecord/application/accountProfile/UserRecordProfileResponse';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';

export class CustomerProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const userRecordQuery = new UserRecordProfileQuery(uid);

            const customerProfileQuery = new CustomerProfileQuery(uid);

            const { userRecord }: UserRecordProfileResponse = await this.query.ask(userRecordQuery);

            const { customer }: CustomerProfileResponse = await this.query.ask(customerProfileQuery);

            res.status(httpStatus.OK).send(this.toResponse(userRecord, customer));

        } catch (error) {
            if (error instanceof CustomerNotFound) {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }

    private toResponse(userRecord: UserRecord, customer: Customer) {
        return {
            uid: customer.uid.toString(),
            address: customer.address.toString(),
            birthday: customer.birthday.value,
            email: userRecord.email.toString(),
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
            claim: userRecord.claim.value
        };
    }
}