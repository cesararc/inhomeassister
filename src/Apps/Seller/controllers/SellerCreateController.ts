import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerCreateCommand } from '../../../Contexts/Customer/Customer/application/create/CustomerCreateCommand';
import httpStatus from 'http-status';

export class SellerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const id = req.body.id;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const displayName = req.body.displayname;

        try {
            const command = new CustomerCreateCommand({
                displayName,
                email,
                id,
                password,
                phone
            });

            await this.commandBus.dispatch(command);
        } catch (error) {
            console.log({ error })
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}