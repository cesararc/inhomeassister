import { StringValueObject } from "../../../Shared/domain/value-objects/StringValueObject";
import { InvalidArgumentError } from '../../../Shared/domain/value-objects/InvalidArgumentError';

export class ServiceProviderPassword extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureValidFormat(value);
    }

    protected ensureValidFormat(value: string) {
        if (value.length < 6) {
            throw new InvalidArgumentError("The password provided must be a string with at least 6 characters")
        }
    }
}