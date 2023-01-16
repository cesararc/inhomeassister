import { InvalidArgumentError } from './InvalidArgumentError';

export class DateValueObject {

    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureValidDate(value);
    }

    protected ensureValidDate(value: string) {
        if (isNaN(Date.parse(value))) {
            throw new InvalidArgumentError('Make sure to send the date in a proper format.')
        }
    }
}