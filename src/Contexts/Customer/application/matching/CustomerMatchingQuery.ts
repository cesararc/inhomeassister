import { Query } from "../../../Shared/domain/Query";

export class CustomerMatchingQuery implements Query {
    param: string;

    constructor(param: string) {
        this.param = param;
    }
}