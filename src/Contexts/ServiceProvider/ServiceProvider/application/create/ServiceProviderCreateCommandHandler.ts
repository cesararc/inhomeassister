import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { ServiceProviderCreateCommand } from './ServiceProviderCreateCommand';
import { ServiceProviderCreate } from './ServiceProviderCreate';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderDisplayName } from '../../domain/ServiceProviderDisplayName';
import { ServiceProviderPhone } from '../../domain/ServiceProviderPhone';
import { ServiceProviderEmail } from '../../domain/ServiceProviderEmail';
import { ServiceProviderPassword } from '../../domain/ServiceProviderPassword';
import { ServiceProviderDisabled } from '../../domain/ServiceProviderDisabled';

export class ServiceProviderCreateCommandHandler implements CommandHandler<ServiceProviderCreateCommand>{
    constructor(private serviceProvider: ServiceProviderCreate) { }

    subscribedTo(): Command {
        return ServiceProviderCreateCommand;
    }

    async handle(command: ServiceProviderCreateCommand): Promise<void> {
        await this.serviceProvider.run(
            new ServiceProviderUid(command.id),
            new ServiceProviderDisabled(command.disabled),
            new ServiceProviderDisplayName(command.displayname),
            new ServiceProviderPhone(command.phone),
            new ServiceProviderEmail(command.email),
            new ServiceProviderPassword(command.password),
        )
    }
}