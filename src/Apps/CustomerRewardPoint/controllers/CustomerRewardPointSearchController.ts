import httpStatus from 'http-status';
import { Response, Request } from 'express';
import { Controller } from '../../controller/Controller';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { CustomerRewardPointSearchQuery } from '../../../Contexts/CustomerRewardPoint/application/search/CustomerRewardPointSearchQuery';
import { CustomerRewardPointSearchResponse } from '../../../Contexts/CustomerRewardPoint/application/search/CustomerRewardPointSearchResponse';
import { CustomerRewardPoint } from '../../../Contexts/CustomerRewardPoint/domain/CustomerRewardPoint';

export class CustomerRewardPointSearchController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const query = new CustomerRewardPointSearchQuery(uid);

            const { customerRewardPoint }: CustomerRewardPointSearchResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(customerRewardPoint));

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }

    private toResponse(customerRewardPoint: CustomerRewardPoint) {
        return {
            total: customerRewardPoint.amount.value
        };
    }
}