
import { AdminUid } from '../../domain/AdminUid';
import { AdminDNI } from '../../domain/AdminDNI';
import { AdminCreate } from './AdminCreate';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { AdminCreateCommand } from './AdminCreateCommand';
import { Command } from '../../../Shared/domain/Command';

export class AdminCreateCommandHandler implements CommandHandler<AdminCreateCommand>{
    constructor(private admin: AdminCreate) { }

    subscribedTo(): Command {
        return AdminCreateCommand;
    }

    async handle(command: AdminCreateCommand): Promise<void> {

        await this.admin.run(
            new AdminUid(command.uid),
            new AdminDNI(command.dni)
        )
    }
}