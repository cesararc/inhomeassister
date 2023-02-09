import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Request, Response } from 'express';
import { ServiceProviderMatchingQuery } from '../../../Contexts/ServiceProvider/application/matching/ServiceProviderMatchingQuery';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';
import { ServiceProvider } from '../../../Contexts/ServiceProvider/domain/ServiceProvider';
import { ServiceProviderNotFound } from '../../../Contexts/ServiceProvider/domain/ServiceProviderNotFound';
import { ServiceProviderMatchingResponse } from '../../../Contexts/ServiceProvider/application/matching/ServiceProviderMatchingResponse';

export class ServiceProviderMatchingController implements Controller {
    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const param = req.params.param;

        try {
            const query = new ServiceProviderMatchingQuery(param);

            const { serviceProvider, userRecord }: ServiceProviderMatchingResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(userRecord, serviceProvider));

        } catch (error) {
            if (error instanceof ServiceProviderNotFound) {
                res.status(httpStatus.NOT_FOUND).json(
                    {
                        statusCode: httpStatus.NOT_FOUND,
                        message: error.message
                    }
                );
            }

            res.status(httpStatus.BAD_REQUEST).json(
                {
                    statusCode: httpStatus.BAD_REQUEST,
                    message: error.message
                }
            );
        }
    }

    private toResponse(userRecord: UserRecord, customer: ServiceProvider) {
        return {
            uid: customer.uid.toString(),
            address: customer.address.toString(),
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
        };
    }
}