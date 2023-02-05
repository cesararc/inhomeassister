import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerCreateCommand } from './CustomerCreateCommand';
import { CustomerCreate } from './CustomerCreate';
import { Command } from '../../../Shared/domain/Command';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';
import { CustomerDni } from '../../domain/CustomerDni';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';

export class CustomerCreateCommandHandler implements CommandHandler<CustomerCreateCommand>{
    constructor(private customerCreate: CustomerCreate) { }

    subscribedTo(): Command {
        return CustomerCreateCommand;
    }

    async handle(command: CustomerCreateCommand): Promise<void> {

        await this.customerCreate.run(
            new CustomerUid(command.uid),
            new UserRecordDisplayName(command.displayName),
            new UserRecordPhone(command.phoneNumber),
            new UserRecordEmail(command.email),
            new UserRecordPassword(command.password),
            new UserRecordClaim(command.claim as any),
            new CustomerAddress(command.address),
            new CustomerBirthday(command.birthday),
            new CustomerDni(command.dni)
        )
    }
}