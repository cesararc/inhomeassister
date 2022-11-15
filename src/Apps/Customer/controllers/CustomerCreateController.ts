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
        const claim = req.body.claim;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const birthday: Date = req.body.birthday;
        const address = req.body.address;
        const dni = req.body.dni;

        try {
            const userRecordCreateCommand = new UserRecordCreateCommand({
                displayName,
                email,
                password,
                claim,
                phone,
                uid
            });

            const customerCreateCommand = new CustomerCreateCommand({
                uid,
                address,
                birthday,
                dni
            });

            await this.commandBus.dispatch(userRecordCreateCommand);

            await this.commandBus.dispatch(customerCreateCommand);
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}