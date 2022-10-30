import { BackofficeCustomerRepository } from '../../domain/BackofficeCustomerRepository';

export class BackofficeCustomerList {
  constructor(private repository: BackofficeCustomerRepository) { }

  async run(limitOfDocuments: number, token: string) {
    return await this.repository.listPaginate(limitOfDocuments, token);
  }
}
