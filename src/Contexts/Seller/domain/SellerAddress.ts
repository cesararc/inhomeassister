import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class SellerAddress extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (value.length === 0) {
            throw new InvalidArgumentError("Seller address is required")
        }

        if (value.length > 200) {
            throw new InvalidArgumentError("Seller address must not exceed 200 characters")
        }
    }
}