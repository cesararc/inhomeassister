import { IntValueObject } from "../../Shared/domain/value-objects/IntValueObject";
import { InvalidArgumentError } from "../../Shared/domain/value-objects/InvalidArgumentError";

export class CustomerRewardPointAmount extends IntValueObject {
    constructor(value: number) {
        super(value);

        this.ensureFormatValid(value);
    }

    increment(amount: number): CustomerRewardPointAmount {
        return new CustomerRewardPointAmount(this.value + amount);
    }

    static initialize(amount: number): CustomerRewardPointAmount {
        return new CustomerRewardPointAmount(amount);
    }

    protected ensureFormatValid(value: number) {
        if (value < 0) {
            throw new InvalidArgumentError("Customer reward point value cannot be less than zero.")
        }
    }
}