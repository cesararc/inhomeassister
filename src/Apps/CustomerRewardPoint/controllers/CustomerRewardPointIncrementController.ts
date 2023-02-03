import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { Response, Request } from 'express';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CustomerRewardPointIncrementCommand } from '../../../Contexts/CustomerRewardPoint/application/increment/CustomerRewardPointIncrementCommand';

export class CustomerRewardPointIncrementController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.body.uid;
        const amount: number = req.body.amount;

        try {

            const command = new CustomerRewardPointIncrementCommand(uid, amount);

            await this.commandBus.dispatch(command);

        } catch (error) {

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.CREATED).send();
    }
}