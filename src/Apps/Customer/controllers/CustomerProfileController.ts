import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerProfileQuery } from '../../../Contexts/Customer/Customer/application/profile/CustomerProfileQuery';
import { CustomerProfileResponse } from '../../../Contexts/Customer/Customer/application/profile/CustomerProfileResponse';
import { Customer } from '../../../Contexts/Customer/Customer/domain/Customer';
import { CustomerNotFound } from '../../../Contexts/Customer/Customer/domain/CustomerNotFound';

export class CustomerProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const customerUid = req.params.uid;

        try {
            const query = new CustomerProfileQuery(customerUid);

            const { customer }: CustomerProfileResponse = await this.query.ask(query);

            res.status(httpStatus.ACCEPTED).send(this.toResponse(customer));

        } catch (error) {
            if (error instanceof CustomerNotFound) {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }

    private toResponse(customer: Customer) {
        return {
            id: customer.id.toString(),
            displayName: customer.displayName.toString(),
            phone: customer.phoneNumber.toString(),
            email: customer.email.toString()
        };
    }
}