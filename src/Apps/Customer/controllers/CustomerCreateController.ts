import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerCreateCommand } from '../../../Contexts/Customer/Customer/application/create/CustomerCreateCommand';
import httpStatus from 'http-status';
import { UserRecordCreateCommand } from '../../../Contexts/UserRecord/application/create/UserRecordCreateCommand';

export class CustomerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const displayName = req.body.displayName;
        const birthday: Date = req.body.birthday;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;

        try {
            const userRecordCreateCommand = new UserRecordCreateCommand({
                displayName,
                email,
                password,
                phone,
                uid
            });

            const customerCreateCommand = new CustomerCreateCommand({
                uid,
                address,
                birthday,
            });

            await this.commandBus.dispatch(userRecordCreateCommand);

            await this.commandBus.dispatch(customerCreateCommand);
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}