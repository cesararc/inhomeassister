import httpStatus from 'http-status';
import { Controller } from "../../controller/Controller";
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Response, Request } from 'express';
import { UserRecordEnableCommand } from '../../../Contexts/UserRecord/application/Enable/UserRecordEnableCommand';

export class UserRecordEnableController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;
        console.log([uid])

        try {
            const command = new UserRecordEnableCommand(uid);
            await this.commandBus.dispatch(command);

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}