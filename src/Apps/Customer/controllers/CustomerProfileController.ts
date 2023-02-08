import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerProfileQuery } from '../../../Contexts/Customer/application/profile/CustomerProfileQuery';
import { CustomerProfileResponse } from '../../../Contexts/Customer/application/profile/CustomerProfileResponse';
import { Customer } from '../../../Contexts/Customer/domain/Customer';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';
import { UserRecordNotFound } from '../../../Contexts/UserRecord/domain/UserRecordNotFound';

export class CustomerProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {

        const uid = req.params.uid;

        try {

            const query = new CustomerProfileQuery(uid);

            const { userRecord, customer }: CustomerProfileResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(userRecord, customer));

        } catch (error) {
            if (error instanceof UserRecordNotFound) {
                res.status(httpStatus.NOT_FOUND).json(
                    {
                        statusCode: httpStatus.NOT_FOUND,
                        message: error.message
                    }
                );
            }

            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                {
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message
                }
            );
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