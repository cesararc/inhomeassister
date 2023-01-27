import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { EnumValueObject } from '../../Shared/domain/value-objects/EnumValueObjects';

export enum Status {
    CREATED = "CREATED",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED",
    PRODUCTION = "PRODUCTION"
}

export class ContractStatus extends EnumValueObject<Status> {
    constructor(value: Status) {
        super(value, Object.values(Status));

        this.ensureFormatValid(value);
    }

    static initialize(): Status { return Status.CREATED };

    static reject(): Status { return Status.REJECTED };

    static approve(): Status { return Status.APPROVED };

    static production(): Status { return Status.PRODUCTION };


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