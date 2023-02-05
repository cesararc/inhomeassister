import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { Command } from '../../../Shared/domain/Command';
import { ServiceProviderCreateCommand } from './ServiceProviderCreateCommand';
import { ServiceProviderCreate } from './ServiceProviderCreate';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderAddress } from '../../domain/ServiceProviderAddress';
import { ServiceProviderDni } from '../../domain/ServiceProviderDni';
import { ServiceProviderDescription } from '../../domain/ServiceProviderDescription';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';

export class ServiceProviderCreateCommandHandler implements CommandHandler<ServiceProviderCreateCommand>{
    constructor(private serviceProvider: ServiceProviderCreate) { }

    subscribedTo(): Command {
        return ServiceProviderCreateCommand;
    }

    async handle(command: ServiceProviderCreateCommand): Promise<void> {
        await this.serviceProvider.run(
            new ServiceProviderUid(command.uid),
            new UserRecordDisplayName(command.displayName),
            new UserRecordPhone(command.phoneNumber),
            new UserRecordEmail(command.email),
            new UserRecordPassword(command.password),
            new UserRecordClaim(command.claim as any),
            new ServiceProviderAddress(command.address),
            new ServiceProviderDni(command.dni),
            new ServiceProviderDescription(command.description),
        )
    }
}