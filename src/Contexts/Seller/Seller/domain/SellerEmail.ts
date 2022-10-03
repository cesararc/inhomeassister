import { StringValueObject } from "../../../Shared/domain/value-objects/StringValueObject";
import { InvalidArgumentError } from '../../../Shared/domain/value-objects/InvalidArgumentError';

export class SellerEmail extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureValidFormat(value)
    }

    protected ensureValidFormat(value: string) {
        const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

        if (!regex.test(value)) {
            throw new InvalidArgumentError("The email address provided is improperly formatted.")
        }
    }
}