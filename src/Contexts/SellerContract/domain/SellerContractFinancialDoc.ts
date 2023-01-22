import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class SellerContractFinancialDoc extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureFormat(value);

    }
    protected ensureFormat(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Financial contract document url is required.");
        }
    }
}