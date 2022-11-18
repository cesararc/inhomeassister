import { BackofficeSellerRepository } from "../../domain/BackofficeSellerRepository";

export class BackofficeSellerList {
  constructor(private repository: BackofficeSellerRepository) {}

  async run(limitOfDocuments: number, token: string) {
    return await this.repository.listPaginate(limitOfDocuments, token);
  }
}
