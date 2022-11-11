import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { ServiceProviderCreateCommand } from '../../../Contexts/ServiceProvider/ServiceProvider/application/create/ServiceProviderCreateCommand';
import { UserRecordCreateCommand } from '../../../Contexts/UserRecord/application/create/UserRecordCreateCommand';
import httpStatus from 'http-status';

export class ServiceProviderCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;
        const dni = req.body.dni;
        const description = req.body.description;

        try {
            const userRecordCreateCommand = new UserRecordCreateCommand({
                displayName,
                email,
                password,
                phone,
                uid
            });

            const serviceProviderCreatecommand = new ServiceProviderCreateCommand({
                uid,
                address,
                description,
                dni
            });

            await this.commandBus.dispatch(userRecordCreateCommand);

            await this.commandBus.dispatch(serviceProviderCreatecommand);

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}