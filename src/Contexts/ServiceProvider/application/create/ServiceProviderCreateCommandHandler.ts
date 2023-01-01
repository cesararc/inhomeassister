import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { Command } from '../../../Shared/domain/Command';
import { ServiceProviderCreateCommand } from './ServiceProviderCreateCommand';
import { ServiceProviderCreate } from './ServiceProviderCreate';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderAddress } from '../../domain/ServiceProviderAddress';
import { ServiceProviderDni } from '../../domain/ServiceProviderDni';
import { ServiceProviderDescription } from '../../domain/ServiceProviderDescription';

export class ServiceProviderCreateCommandHandler implements CommandHandler<ServiceProviderCreateCommand>{
    constructor(private serviceProvider: ServiceProviderCreate) { }

    subscribedTo(): Command {
        return ServiceProviderCreateCommand;
    }

    async handle(command: ServiceProviderCreateCommand): Promise<void> {
        await this.serviceProvider.run(
            new ServiceProviderUid(command.uid),
            new ServiceProviderAddress(command.address),
            new ServiceProviderDni(command.dni),
            new ServiceProviderDescription(command.description),
        )
    }
}