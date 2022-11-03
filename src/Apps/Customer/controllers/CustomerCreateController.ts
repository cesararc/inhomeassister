import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerCreateCommand } from '../../../Contexts/Customer/Customer/application/create/CustomerCreateCommand';
import httpStatus from 'http-status';

export class CustomerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const birthday: Date = req.body.birthday;
        const address = req.body.address;

        try {
            const command = new CustomerCreateCommand({
                userRecordUid: uid,
                uid,
                address,
                birthday,
            });

            await this.commandBus.dispatch(command);
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}