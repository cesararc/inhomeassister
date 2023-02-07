import { SellerCreate } from './SellerCreate';
import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { SellerCreateCommand } from './SellerCreateCommand';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';


export class SellerCreateCommandHandler implements CommandHandler<SellerCreateCommand>{
    constructor(private serviceProvider: SellerCreate) { }

    subscribedTo(): Command {
        return SellerCreateCommand;
    }

    async handle(command: SellerCreateCommand): Promise<void> {
        await this.serviceProvider.run(
            new SellerUid(command.uid),
            new UserRecordDisplayName(command.displayName),
            new UserRecordPhone(command.phoneNumber),
            new UserRecordEmail(command.email),
            new UserRecordPassword(command.password),
            new UserRecordClaim(command.claim as any),
            new SellerAddress(command.address),
            new SellerDni(command.dni),
        )
    }
}