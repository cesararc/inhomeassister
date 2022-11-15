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
    }

    protected throwErrorForInvalidValue(value: Claim): void {
        throw new InvalidArgumentError(`${value} is not a entity valid user record.`);
    }
}