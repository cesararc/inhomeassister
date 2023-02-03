import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerCreateCommand } from './CustomerCreateCommand';
import { CustomerCreate } from './CustomerCreate';
import { Command } from '../../../Shared/domain/Command';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';
import { CustomerDni } from '../../domain/CustomerDni';

export class CustomerCreateCommandHandler implements CommandHandler<CustomerCreateCommand>{
    constructor(private customer: CustomerCreate) { }

    subscribedTo(): Command {
        return CustomerCreateCommand;
    }

    async handle(command: CustomerCreateCommand): Promise<void> {

        await this.customer.run(
            new CustomerUid(command.uid),
            new CustomerAddress(command.address),
            new CustomerBirthday(command.birthday),
            new CustomerDni(command.dni)
        )
    }
}