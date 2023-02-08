import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { UserRecord } from '../../../Contexts/UserRecord/domain/UserRecord';
import { ServiceProviderProfileResponse } from '../../../Contexts/ServiceProvider/application/profile/ServiceProviderProfileResponse';
import { ServiceProvider } from '../../../Contexts/ServiceProvider/domain/ServiceProvider';
import { ServiceProviderProfileQuery } from '../../../Contexts/ServiceProvider/application/profile/ServiceProviderProfileQuery';
import { UserRecordNotFound } from '../../../Contexts/UserRecord/domain/UserRecordNotFound';

export class ServiceProviderProfileController implements Controller {

    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const query = new ServiceProviderProfileQuery(uid);

            const { serviceProvider, userRecord }: ServiceProviderProfileResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(userRecord, serviceProvider));

        } catch (error) {
            if (error instanceof UserRecordNotFound) {
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

    private toResponse(userRecord: UserRecord, serviceProvider: ServiceProvider) {
        return {
            uid: serviceProvider.uid.toString(),
            dni: serviceProvider.dni.toString(),
            description: serviceProvider.description.toString(),
            address: serviceProvider.address.value,
            email: userRecord.email.toString(),
            phone: userRecord.phoneNumber.toString(),
            displayName: userRecord.displayName.toString(),
            claim: userRecord.claim.value
        }
    }
}