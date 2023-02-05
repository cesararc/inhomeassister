import httpStatus from 'http-status';
import { Response, Request } from 'express';
import { Controller } from '../../controller/Controller';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerCreateCommand } from '../../../Contexts/Customer/application/create/CustomerCreateCommand';
import { UserRecordDeleteCommand } from '../../../Contexts/UserRecord/application/Delete/UserRecordDeleteCommand';

export class CustomerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid as string;
        const claim = req.body.claim;
        const displayName = req.body.displayName as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const phoneNumber = req.body.phone as string;
        const birthday = req.body.birthday as string;
        const address = req.body.address as string;
        const dni = req.body.dni as string;

        try {

            const command = new CustomerCreateCommand({
                uid,
                displayName,
                phoneNumber,
                email,
                password,
                claim,
                address,
                birthday,
                dni
            });

            await this.commandBus.dispatch(command);

            res.status(httpStatus.CREATED).send();

        } catch (error) {

            const rollback = new UserRecordDeleteCommand(uid);

            this.commandBus.dispatch(rollback);

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}