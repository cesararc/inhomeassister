import { Controller } from "../../controller/Controller";
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Request, Response } from 'express';
import { ContractRejectCommand } from '../../../Contexts/Contract/application/contractReject/ContractRejectCommand';
import httpStatus from 'http-status';

export class ContractRejectController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const command = new ContractRejectCommand(uid);

            await this.commandBus.dispatch(command);

            res.status(httpStatus.OK).send();
        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}