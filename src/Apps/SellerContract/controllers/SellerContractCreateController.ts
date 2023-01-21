import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from '../../controller/Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SellerContractCreateCommand } from '../../../Contexts/SellerContract/application/create/SellerContractCreateCommand';

export class SellerContractCreateController implements Controller {
    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const seller = req.body.seller;
        const customer = req.body.customer;
        const serviceProvider = req.body.service_provider;
        const contractDoc = req.body.contractDoc;
        const financialDoc = req.body.financialDoc;
        const createdAt = req.body.created_at;

        try {
            const command = new SellerContractCreateCommand(uid, seller, customer, serviceProvider, contractDoc, financialDoc, createdAt);

            await this.commandBus.dispatch(command);

            res.status(httpStatus.CREATED).send();
        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

    }
}