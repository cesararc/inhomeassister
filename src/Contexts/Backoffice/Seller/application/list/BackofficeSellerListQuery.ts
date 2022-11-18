import { Query } from "../../../../Shared/domain/Query";

export class BackofficeSellerListQuery implements Query {
  limitOfDocuments: number;
  token: string;

  constructor(limitOfDocuments: number, token: string) {
    this.limitOfDocuments = limitOfDocuments;
    this.token = token;
  }
}
