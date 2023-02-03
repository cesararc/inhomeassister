import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class CustomerDni extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Customer dni is required")
        }
    }
}