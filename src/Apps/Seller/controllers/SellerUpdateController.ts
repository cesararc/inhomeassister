import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller/Controller';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { UserRecordUpdateCommand } from '../../../Contexts/UserRecord/application/Update/UserRecordUpdateCommand';
import { SellerUpdateCommand } from '../../../Contexts/Seller/application/update/ServiceProviderUpdateCommand';

export class SellerUpdateController implements Controller {

    constructor(private commandBus: CommandBus) { }

    async run(req: Request, res: Response): Promise<void> {
        const uid = req.params.uid;
        const displayName = req.body.displayName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const dni = req.body.dni;

        try {
            const userRecordUpdateCommand = new UserRecordUpdateCommand({
                uid: uid,
                displayName,
                email,
                phone
            });

            const sellerUpdateCommand = new SellerUpdateCommand({
                uid,
                address,
                dni,
            });

            await this.commandBus.dispatch(userRecordUpdateCommand);

            await this.commandBus.dispatch(sellerUpdateCommand);

        } catch (error) {
            if (error.code === "auth/user-not-found") {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        res.status(httpStatus.OK).send();
    }
}