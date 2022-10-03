import { InvalidArgumentError } from './InvalidArgumentError';

export class DateValueObject {

    value: Date;

    constructor(value: Date) {
        this.value = value;
    }

    protected ensureValidDate(value: Date) {
        if (!(value instanceof Date)) {
            throw new InvalidArgumentError('Date created at is not valid.')
        }
    }
}