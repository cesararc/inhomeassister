import { Query } from "../../../../../Shared/domain/Query";

export class CustomerListQuery implements Query {
    maxResults: number
    token: string
    
    constructor(maxResults: number, token: string) {
        this.maxResults = maxResults
        this.token = token
    }
}