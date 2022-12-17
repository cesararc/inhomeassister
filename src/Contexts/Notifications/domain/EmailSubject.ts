import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class EmailSubject extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}