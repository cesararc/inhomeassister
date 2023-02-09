import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class UserRecordPhone extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureFormat(value);
    }

    ensureFormat(value: string) {

        if (!value || value.length === 0) throw new InvalidArgumentError("Phone number is required.");

        var patt = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

        if (!patt.test(value)) throw new InvalidArgumentError("Phone number invalid format.");
    }
}