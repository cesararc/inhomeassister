import { Controller } from "../../controller/Controller";
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Response, Request } from 'express';
import { UserRecordDisableCommand } from '../../../Contexts/UserRecord/application/Disable/UserRecordDisableCommand';
import httpStatus from 'http-status';

export class UserRecordDisableController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const command = new UserRecordDisableCommand(uid);
            await this.commandBus.dispatch(command);

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}