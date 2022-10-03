import { BooleanValueObject } from "../../../Shared/domain/value-objects/BooleanValueObject";
import { InvalidArgumentError } from '../../../Shared/domain/value-objects/InvalidArgumentError';

export class ServiceProviderDisabled extends BooleanValueObject {

    value: boolean;

    constructor(value: boolean) {
        super(value);
        this.ensureFormat(value);

        this.value = value;
    }

    protected ensureFormat(value: any): void {
        if (!(value instanceof Boolean)) {
            throw new InvalidArgumentError('Empty field disabled or bad formed field.')
        }
    }
}