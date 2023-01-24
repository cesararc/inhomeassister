import { BooleanValueObject } from "../../Shared/domain/value-objects/BooleanValueObject";

export class ContractVerified extends BooleanValueObject {
    static initialize(): boolean { return false };
}