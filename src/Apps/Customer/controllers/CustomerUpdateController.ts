
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import httpStatus from 'http-status';
import { CustomerUpdateCommand } from '../../../Contexts/Customer/Customer/application/update/CustomerUpdateCommand';

export class CustomerUpdateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const birthday: Date = req.body.birthday;
        const address = req.body.address;
        const dni = req.body.dni;

        try {

            const command = new CustomerUpdateCommand({
                uid,
                address,
                birthday,
                dni
            });

            await this.commandBus.dispatch(command);

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}