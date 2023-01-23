import { DateValueObject } from "../../Shared/domain/value-objects/DateValueObject";

export class ContractVerifiedAt extends DateValueObject {
    static initialize(): string {
        return new Date().toISOString();
    }
}