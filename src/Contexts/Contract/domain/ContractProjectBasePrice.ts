import { IntValueObject } from "../../Shared/domain/value-objects/IntValueObject";

export class ContractProjectBasePrice extends IntValueObject {
    constructor(value: number) {
        super(value);
    }

    static initialize() { return 0.00 }
}