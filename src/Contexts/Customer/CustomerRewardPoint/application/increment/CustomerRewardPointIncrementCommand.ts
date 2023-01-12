import { Command } from '../../../../Shared/domain/Command';

export class CustomerRewardPointIncrementCommand extends Command {
    uid: string;
    amount: number;

    constructor(uid: string, amount: number) {
        super();
        this.uid = uid;
        this.amount = amount;
    }
}