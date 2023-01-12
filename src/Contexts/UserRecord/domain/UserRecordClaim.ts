import { EnumValueObject } from "../../Shared/domain/value-objects/EnumValueObjects";
import { InvalidArgumentError } from "../../Shared/domain/value-objects/InvalidArgumentError";

export enum Claim {
    SELLER = "seller",
    SERVICE_PROVIDER = "service_provider",
    CUSTOMER = "customer",
}

export class UserRecordClaim extends EnumValueObject<Claim> {

    constructor(value: Claim) {
        super(value, Object.values(Claim));

        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError(`User record format not valid.`);
        }
    }

    protected throwErrorForInvalidValue(value: Claim): void {
        if (value.length === 0) {
            throw new InvalidArgumentError(`Claim empty is not a entity valid user record.`);
        }

        throw new InvalidArgumentError(`${value} is not a entity valid user record.`);
    }
}