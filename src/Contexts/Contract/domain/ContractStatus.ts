import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { EnumValueObject } from '../../Shared/domain/value-objects/EnumValueObjects';

export enum Status {
    CREATED = "created",
    REJECTED = "rejected",
    VERIFIED = "verified",
}

export class ContractStatus extends EnumValueObject<Status> {
    constructor(value: Status) {
        super(value, Object.values(Status));

        this.ensureFormatValid(value);
    }

    static initialize(): Status { return Status.CREATED };

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError(`Status contract is not valid.`);
        }
    }

    protected throwErrorForInvalidValue(value: Status): void {
        if (value.length === 0) {
            throw new InvalidArgumentError(`Status contract is not valid.`);
        }

        throw new InvalidArgumentError(`${value} is not a entity valid for contract`);
    }
}