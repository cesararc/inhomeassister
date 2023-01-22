import { BooleanValueObject } from "../../Shared/domain/value-objects/BooleanValueObject";

export class SellerContractVerified extends BooleanValueObject {
    static initialize(): boolean { return false };
}