import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { UserRecordResetPasswordCommand } from '../../../Contexts/UserRecord/application/accountResetPassword/UserRecordResetPasswordCommand';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';

export class UserRecordResetPasswordController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const email = req.params.email;

        try {
            const command = new UserRecordResetPasswordCommand({ email });
            await this.commandBus.dispatch(command);

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}