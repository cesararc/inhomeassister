import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerUpdateCommand } from '../../../Contexts/Customer/application/update/CustomerUpdateCommand';
import { UserRecordUpdateCommand } from '../../../Contexts/UserRecord/application/Update/UserRecordUpdateCommand';

export class CustomerUpdateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;
        const birthday = req.body.birthday;
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

            res.status(httpStatus.OK).send();
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                res.status(httpStatus.NOT_FOUND).send({ statusCode: httpStatus.NOT_FOUND, message: error.message });
            }

            res.status(httpStatus.BAD_REQUEST).send({ statusCode: httpStatus.BAD_REQUEST, message: error.message });
        }
    }
}