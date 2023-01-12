import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerUpdateCommand } from '../../../Contexts/Customer/Customer/application/update/CustomerUpdateCommand';
import { UserRecordUpdateCommand } from '../../../Contexts/UserRecord/application/accountUpdate/UserRecordUpdateCommand';
import { ServiceProviderUpdateCommand } from '../../../Contexts/ServiceProvider/application/update/ServiceProviderUpdateCommand';

export class ServiceProviderUpdateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;

        const description = req.body.description;
        const address = req.body.address;
        const dni = req.body.dni;

        try {
            const userRecordUpdateCommand = new UserRecordUpdateCommand({
                uid: uid,
                displayName,
                email,
                phone
            });

            const serviceProviderUpdateCommand = new ServiceProviderUpdateCommand({
                uid,
                address,
                dni,
                description
            });

            await this.commandBus.dispatch(userRecordUpdateCommand);

            await this.commandBus.dispatch(serviceProviderUpdateCommand);

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}