import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class SellerDni extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Seller dni is required")
        }
    }
}