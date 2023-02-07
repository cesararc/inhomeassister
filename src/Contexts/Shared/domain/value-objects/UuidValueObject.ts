import { v4 } from 'uuid';
import validate from 'uuid-validate';

import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid {
    readonly value: string;

    constructor(value: string) {
        this.ensureIsValidUuid(value);
        this.value = value;
    }

    static random() {
        return new Uuid(v4());
    }

    private ensureIsValidUuid(id: string): void {
        if (!id || id.length === 0) {
            throw new InvalidArgumentError(`${this.constructor.name} is required`);
        }

        if (!validate(id)) {
            throw new InvalidArgumentError(`${this.constructor.name} does not allow the value ${id}`);
        }
    }

    toString(): string {
        return this.value;
    }

}