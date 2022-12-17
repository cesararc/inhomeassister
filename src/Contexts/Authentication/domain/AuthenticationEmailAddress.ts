import { InvalidArgumentError } from "../../Shared/domain/value-objects/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class AuthenticationEmailAddress extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Authentication email address is required.");
        }
    }
}