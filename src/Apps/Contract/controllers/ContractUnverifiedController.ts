import { Controller } from "../../controller/Controller";
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Request, Response } from 'express';
import { ContractUnverifiedQuery } from '../../../Contexts/Contract/application/unverified/ContractUnverifiedQuery';
import { Contract } from '../../../Contexts/Contract/domain/Contract';
import httpStatus from 'http-status';
import { ContractUnverifiedResponse } from "../../../Contexts/Contract/application/unverified/ContractUnverifiedResponse";

export class ContractUnverifiedController implements Controller {
    constructor(private query: QueryBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;

        try {
            const query = new ContractUnverifiedQuery(uid);

            const { contract }: ContractUnverifiedResponse = await this.query.ask(query);

            res.status(httpStatus.OK).send(this.toResponse(contract));

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

    }
    private toResponse(contract: Contract[]) {
        return contract.map(item => ({
            uid: item.uid.value,
            createdAt: item.createdAt.value,
            status: item.status.value,
            updatedAt: item.updateAt.value
        }));
    }

}