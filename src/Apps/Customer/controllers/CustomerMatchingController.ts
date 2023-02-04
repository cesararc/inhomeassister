import { Controller } from "../../controller/Controller";
import { Request, Response } from 'express';
import { CustomerMatchingQuery } from '../../../Contexts/Customer/application/matching/CustomerMatchingQuery';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerMatchingResponse } from '../../../Contexts/Customer/application/matching/CustomerMatchingResponse';
import httpStatus from 'http-status';
import { Customer } from "../../../Contexts/Customer/domain/Customer";
import { CustomerNotFound } from '../../../Contexts/Customer/domain/CustomerNotFound';
import { UserRecordProfileQuery } from '../../../Contexts/UserRecord/application/Profile/UserRecordProfileQuery';
import { UserRecordProfileResponse } from '../../../Contexts/UserRecord/application/Profile/UserRecordProfileResponse';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';

export class CustomerMatchingController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const param = req.params.param;

        try {
            const customerQuery = new CustomerMatchingQuery(param);

            const { customer }: CustomerMatchingResponse = await this.query.ask(customerQuery);

            const userRecordQuery = new UserRecordProfileQuery(customer.uid.value);

            const { userRecord }: UserRecordProfileResponse = await this.query.ask(userRecordQuery);

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
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
        };
    }
}