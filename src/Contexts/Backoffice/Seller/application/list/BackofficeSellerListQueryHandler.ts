import { Query } from "../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../Shared/domain/QueryHandler";
import { BackofficeSellerResponse } from "../BackofficeSellerResponse";
import { BackofficeSellerList } from "./BackofficeSellerList";
import { BackofficeSellerListQuery } from "./BackofficeSellerListQuery";

export class BackofficeSellerListQueryHandler implements QueryHandler<BackofficeSellerListQuery, BackofficeSellerResponse>{

    constructor(private sellerList: BackofficeSellerList) {}

    subscribedTo(): Query {
        return BackofficeSellerListQuery;
    }
    
    async handle(query: BackofficeSellerListQuery): Promise<BackofficeSellerResponse> { 
        const { results, nextPageToken } = await this.sellerList.run(query.limitOfDocuments, query.token);

        return new BackofficeSellerResponse(results, nextPageToken);
    }

}