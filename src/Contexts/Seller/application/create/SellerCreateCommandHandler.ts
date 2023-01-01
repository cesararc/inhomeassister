import { SellerCreate } from './SellerCreate';
import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { SellerCreateCommand } from './SellerCreateCommand';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';


export class SellerCreateCommandHandler implements CommandHandler<SellerCreateCommand>{
    constructor(private serviceProvider: SellerCreate) { }

    subscribedTo(): Command {
        return SellerCreateCommand;
    }

    async handle(command: SellerCreateCommand): Promise<void> {
        await this.serviceProvider.run(
            new SellerUid(command.uid),
            new SellerAddress(command.address),
            new SellerDni(command.dni),
        )
    }
}