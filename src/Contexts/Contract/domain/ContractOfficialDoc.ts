import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class ContractOfficialDoc extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureFormat(value);

    }

    protected ensureFormat(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Official contract document url is required.");
        }
    }
}