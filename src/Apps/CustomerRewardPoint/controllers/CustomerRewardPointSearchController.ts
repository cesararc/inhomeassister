import { Response, Request } from 'express';
import { Controller } from '../../controller/Controller';
import httpStatus from 'http-status';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerNotFound } from '../../../Contexts/Customer/Customer/domain/CustomerNotFound';
import { CustomerRewardPointSearchQuery } from '../../../Contexts/Customer/CustomerRewardPoint/application/search/CustomerRewardPointSearchQuery';
import { CustomerRewardPointSearchResponse } from '../../../Contexts/Customer/CustomerRewardPoint/application/search/CustomerRewardPointSearchResponse';
import { CustomerRewardPoint } from '../../../Contexts/Customer/CustomerRewardPoint/domain/CustomerRewardPoint';

export class CustomerRewardPointSearchController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const query = new CustomerRewardPointSearchQuery(uid);

            const { customerRewardPoint }: CustomerRewardPointSearchResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(customerRewardPoint));

        } catch (error) {
            if (error instanceof CustomerNotFound) {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }

    private toResponse(customerRewardPoint: CustomerRewardPoint) {
        return {
            uid: customerRewardPoint.uid.value,
            total: customerRewardPoint.amount.value
        };
    }
}