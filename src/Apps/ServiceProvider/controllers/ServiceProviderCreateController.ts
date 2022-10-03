import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import httpStatus from 'http-status';
import { ServiceProviderCreateCommand } from '../../../Contexts/ServiceProvider/ServiceProvider/application/create/ServiceProviderCreateCommand';

export class ServiceProviderCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const id = req.body.id;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const displayName = req.body.displayname;
        const disabled: boolean = req.body.disabled;

        try {
            const command = new ServiceProviderCreateCommand({
                displayName,
                email,
                disabled,
                id,
                password,
                phone
            });

            await this.commandBus.dispatch(command);

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}