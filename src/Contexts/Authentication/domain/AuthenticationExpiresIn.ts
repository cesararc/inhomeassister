import { IntValueObject } from "../../Shared/domain/value-objects/IntValueObject";
import { InvalidArgumentError } from "../../Shared/domain/value-objects/InvalidArgumentError";

export class AuthenticationExpiresIn extends IntValueObject {

    constructor(value: number) {
        super(value);
        this.ensureFormatValid(value);
    }

    static timeDuration(): number {
        return 60 * 60 * 24 * 5 * 1000;
    }

    protected ensureFormatValid(value: number) {
        if (value > 60 * 60 * 24 * 5 * 1000) {
            throw new InvalidArgumentError("Authentication token expire invalid value");
        }
    }
}