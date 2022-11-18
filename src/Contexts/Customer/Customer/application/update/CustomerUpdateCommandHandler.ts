import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';
import { CustomerDni } from '../../domain/CustomerDni';
import { CustomerUpdate } from './CustomerUpdate';
import { CustomerUpdateCommand } from './CustomerUpdateCommand';

export class CustomerUpdateCommandHandler implements CommandHandler<CustomerUpdateCommand>{
    constructor(private customer: CustomerUpdate) { }

    subscribedTo(): Command {
        return CustomerUpdateCommand;
    }

    async handle(command: CustomerUpdateCommand): Promise<void> {
        await this.customer.run(
            new CustomerUid(command.uid),
            new CustomerAddress(command.address),
            new CustomerBirthday(command.birthday),
            new CustomerDni(command.dni)
        )
    }
}