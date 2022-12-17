import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class EmailAddress extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    protected ensureFormatValid(value: string) {
        if (!value.includes("@")) {
            throw new InvalidArgumentError('Email improperly format')
        }
    }
}