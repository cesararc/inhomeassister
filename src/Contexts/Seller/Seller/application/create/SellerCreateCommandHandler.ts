import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { SellerUid } from '../../domain/SellerUid';
import { SellerDisplayName } from '../../domain/SellerDisplayName';
import { SellerEmail } from '../../domain/SellerEmail';
import { SellerPassword } from '../../domain/SellerPassword';
import { SellerPhone } from '../../domain/SellerPhone';
import { SellerCreate } from './SellerCreate';
import { SellerCreateCommand } from './SellerCreateCommand';

export class SellerCreateCommandHandler implements CommandHandler<SellerCreateCommand>{
    constructor(private Seller: SellerCreate) { }

    subscribedTo(): Command {
        return SellerCreateCommand;
    }

    async handle(command: SellerCreateCommand): Promise<void> {
        await this.Seller.run(
            new SellerUid(command.id),
            new SellerDisplayName(command.displayname),
            new SellerPhone(command.phone),
            new SellerEmail(command.email),
            new SellerPassword(command.password),
        )
    }
}