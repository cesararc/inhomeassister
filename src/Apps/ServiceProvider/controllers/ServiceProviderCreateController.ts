import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { ServiceProviderCreateCommand } from '../../../Contexts/ServiceProvider/application/create/ServiceProviderCreateCommand';

export class ServiceProviderCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const phoneNumber = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;
        const dni = req.body.dni;
        const description = req.body.description;
        const claim = req.body.claim;

        try {
            const command = new ServiceProviderCreateCommand({
                uid,
                displayName,
                email,
                password,
                phoneNumber,
                claim,
                address,
                description,
                dni
            });

            await this.commandBus.dispatch(command);

            res.status(httpStatus.CREATED).send();
        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send({ statusCode: httpStatus.BAD_REQUEST, message: error.message });
        }

    }
}