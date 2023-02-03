import { Command } from "../../../Shared/domain/Command";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { CustomerRewardPointIncrementCommand } from "./CustomerRewardPointIncrementCommand";
import { CustomerRewardPointIncrement } from './CustomerRewardPointIncrement';
import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from "../../domain/CustomerRewardPointUid";
import { CustomerRewardPointAmount } from "../../domain/CustomerRewardPointAmount";

export class CustomerRewardPointIncrementCommandHandler implements CommandHandler<CustomerRewardPointIncrementCommand>{
    constructor(private rewardPoint: CustomerRewardPointIncrement) { }

    subscribedTo(): Command {
        return CustomerRewardPointIncrementCommand;
    }

    async handle(command: CustomerRewardPointIncrementCommand): Promise<void> {
        await this.rewardPoint.run(new CustomerRewardPoint(new CustomerRewardPointUid(command.uid), new CustomerRewardPointAmount(command.amount)))
    }

}