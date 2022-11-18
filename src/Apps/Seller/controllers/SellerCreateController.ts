import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import httpStatus from 'http-status';
import { SellerCreateCommand } from '../../../Contexts/Seller/Seller/application/create/SellerCreateCommand';

export class SellerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const id = req.body.id;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const displayName = req.body.displayname;

        try {
            const command = new SellerCreateCommand({
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