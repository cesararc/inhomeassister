import { InvalidArgumentError } from "../../Shared/domain/value-objects/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class ServiceProviderDescription extends StringValueObject {

    constructor(value: string) {
        super(value);

        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Service provider description is required")
        }

        if (value.length > 200) {
            throw new InvalidArgumentError("Service provider description must not exceed 200 characters")
        }
    }
}