import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { CustomerCreateCommand } from './CustomerCreateCommand';
import { CustomerCreate } from './CustomerCreate';
import { Command } from '../../../../Shared/domain/Command';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerDisplayName } from '../../domain/CustomerDisplayName';
import { CustomerEmail } from '../../domain/CustomerEmail';
import { CustomerPassword } from '../../domain/CustomerPassword';
import { CustomerPhone } from '../../domain/CustomerPhone';

export class CustomerCreateCommandHandler implements CommandHandler<CustomerCreateCommand>{
    constructor(private customer: CustomerCreate) { }

    subscribedTo(): Command {
        return CustomerCreateCommand;
    }

    async handle(command: CustomerCreateCommand): Promise<void> {
        await this.customer.run(
            new CustomerUid(command.id),
            new CustomerDisplayName(command.displayname),
            new CustomerPhone(command.phone),
            new CustomerEmail(command.email),
            new CustomerPassword(command.password),
        )
    }
}