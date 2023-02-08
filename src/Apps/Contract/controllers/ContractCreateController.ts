import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from '../../controller/Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ContractCreateCommand } from '../../../Contexts/Contract/application/create/ContractCreateCommand';

export class ContractCreateController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const seller = req.body.seller;
        const customer = req.body.customer;
        const serviceProvider = req.body.service_provider;
        const officialDoc = req.body.officialDoc;
        const financialDoc = req.body.financialDoc;

        try {
            const command = new ContractCreateCommand(uid, seller, customer, serviceProvider, officialDoc, financialDoc);

            await this.commandBus.dispatch(command);

            res.status(httpStatus.CREATED).send();
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