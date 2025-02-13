import httpStatus from 'http-status';
import { Response, Request } from 'express';
import { Controller } from '../../controller/Controller';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { UserRecordCreateCommand } from '../../../Contexts/UserRecord/application/Create/UserRecordCreateCommand';
import { AdminCreateCommand } from '../../../Contexts/Admin/application/create/AdminCreateCommand';
import { UserRecordDeleteCommand } from '../../../Contexts/UserRecord/application/Delete/UserRecordDeleteCommand';

export class AdminCreateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid as string;
        const claim = req.body.claim;
        const displayName = req.body.displayName as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const phone = req.body.phone as string;
        const dni = req.body.dni as string;

        try {

            const userRecordCreateCommand = new UserRecordCreateCommand({
                displayName,
                email,
                password,
                claim,
                phone,
                uid
            });

            const adminCreateCommand = new AdminCreateCommand({
                uid,
                dni
            });

            await this.commandBus.dispatch(userRecordCreateCommand);

            await this.commandBus.dispatch(adminCreateCommand);

            res.status(httpStatus.CREATED).send();

        } catch (error) {

            const rollback = new UserRecordDeleteCommand(uid);

            this.commandBus.dispatch(rollback);

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}