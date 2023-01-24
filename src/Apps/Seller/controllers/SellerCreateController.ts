import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { UserRecordCreateCommand } from '../../../Contexts/UserRecord/application/Create/UserRecordCreateCommand';
import { UserRecordRemoveCommand } from '../../../Contexts/UserRecord/application/Remove/UserRecordRemoveCommand';
import { SellerCreateCommand } from '../../../Contexts/Seller/application/create/SellerCreateCommand';

export class SellerCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;
        const dni = req.body.dni;
        const claim = req.body.claim;

        try {
            const sellerCreateCommand = new SellerCreateCommand({
                uid,
                address,
                dni
            });

            const userRecordCreateCommand = new UserRecordCreateCommand({
                displayName,
                email,
                password,
                phone,
                claim,
                uid
            });

            await this.commandBus.dispatch(userRecordCreateCommand);

            await this.commandBus.dispatch(sellerCreateCommand);

            res.status(httpStatus.CREATED).send();
        } catch (error) {
            const rollback = new UserRecordRemoveCommand(uid);

            this.commandBus.dispatch(rollback);

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

    }
}