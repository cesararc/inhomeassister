import { ContractUnverifiedResponse } from './ContractUnverifiedResponse';
import { ContractUnverified } from './ContractUnverified';
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { ContractUnverifiedQuery } from "./ContractUnverifiedQuery";
import { Query } from "../../../Shared/domain/Query";
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';

export class ContractUnverifiedQueryHandler implements QueryHandler<ContractUnverifiedQuery, ContractUnverifiedResponse>{

    constructor(private contract: ContractUnverified) { }

    subscribedTo(): Query {
        return ContractUnverifiedQuery;
    }

    async handle(query: ContractUnverifiedQuery): Promise<ContractUnverifiedResponse> {
        const customer = await this.contract.run(new UserRecordUid(query.uid));

        return new ContractUnverifiedResponse(customer);
    }
}
