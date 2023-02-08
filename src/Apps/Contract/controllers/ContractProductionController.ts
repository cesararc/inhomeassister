import httpStatus from 'http-status';
import { Controller } from "../../controller/Controller";
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Request, Response } from 'express';
import { ContractProductionCommand } from '../../../Contexts/Contract/application/contractProduction/ContractProductionCommand';

export class ContractProductionController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const command = new ContractProductionCommand(uid);

            await this.commandBus.dispatch(command);

            res.status(httpStatus.OK).send();
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).json(
                {
                    statusCode: httpStatus.BAD_REQUEST,
                    message: error.message
                }
            );
        }
    }
}