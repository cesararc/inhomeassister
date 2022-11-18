import { InvalidArgumentError } from "../../../Shared/domain/value-objects/InvalidArgumentError";
import { StringValueObject } from "../../../Shared/domain/value-objects/StringValueObject";

export class ServiceProviderDescription extends StringValueObject {

    value: string;

    constructor(value: string) {
        super(value);

        this.ensureFormatValid(value);
        this.value = value;
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Description service provider is required")
        }

        if (value.length > 200) {
            throw new InvalidArgumentError("Description service provider must not exceed 200 characters")
        }
    }
}