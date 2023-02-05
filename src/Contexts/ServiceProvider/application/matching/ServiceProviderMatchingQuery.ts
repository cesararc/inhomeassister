import { Query } from "../../../Shared/domain/Query";

export class ServiceProviderMatchingQuery implements Query {
    param: string;

    constructor(param: string) {
        this.param = param;
    }
}