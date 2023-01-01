import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { Command } from '../../../Shared/domain/Command';
import { ServiceProviderUpdateCommand } from './ServiceProviderUpdateCommand';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderAddress } from '../../domain/ServiceProviderAddress';
import { ServiceProviderDni } from '../../domain/ServiceProviderDni';
import { ServiceProviderDescription } from '../../domain/ServiceProviderDescription';
import { ServiceProviderUpdate } from './ServiceProviderUpdate';

export class ServiceProviderUpdateCommandHandler implements CommandHandler<ServiceProviderUpdateCommand>{
    constructor(private serviceProvider: ServiceProviderUpdate) { }

    subscribedTo(): Command {
        return ServiceProviderUpdateCommand;
    }

    async handle(command: ServiceProviderUpdateCommand): Promise<void> {
        await this.serviceProvider.run(
            new ServiceProviderUid(command.uid),
            new ServiceProviderAddress(command.address),
            new ServiceProviderDni(command.dni),
            new ServiceProviderDescription(command.description),
        )
    }
}