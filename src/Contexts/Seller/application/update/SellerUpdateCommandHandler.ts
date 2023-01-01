import { SellerUpdate } from './SellerUpdate';
import { Command } from '../../../Shared/domain/Command';
import { SellerUpdateCommand } from './ServiceProviderUpdateCommand';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';


export class SellerUpdateCommandHandler implements CommandHandler<SellerUpdateCommand>{
    constructor(private seller: SellerUpdate) { }

    subscribedTo(): Command {
        return SellerUpdateCommand;
    }

    async handle(command: SellerUpdateCommand): Promise<void> {
        await this.seller.run(
            new SellerUid(command.uid),
            new SellerAddress(command.address),
            new SellerDni(command.dni),
        )
    }
}