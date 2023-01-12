import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerUpdateCommand } from '../../../Contexts/Customer/Customer/application/update/CustomerUpdateCommand';
import { UserRecordUpdateCommand } from '../../../Contexts/UserRecord/application/accountUpdate/UserRecordUpdateCommand';

export class CustomerUpdateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;

        const birthday: Date = req.body.birthday;
        const address = req.body.address;
        const dni = req.body.dni;

        try {
            const userRecordUpdateCommand = new UserRecordUpdateCommand({
                uid: uid,
                displayName,
                email,
                phone
            });

            const customerUpdateCommand = new CustomerUpdateCommand({
                uid,
                address,
                birthday,
                dni
            });

            await this.commandBus.dispatch(userRecordUpdateCommand);

            await this.commandBus.dispatch(customerUpdateCommand);

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}