import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";
import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';

export class ServiceProviderDni extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureFormatValid(value);
    }

    protected ensureFormatValid(value: string) {
        if (!value || value.length === 0) {
            throw new InvalidArgumentError("Service provider dni is required")
        }
    }
}