import { BackofficeCustomerRepository } from '../../domain/BackofficeCustomerRepository';

export class BackofficeCustomerList {
  constructor(private repository: BackofficeCustomerRepository) { }

  async run(maxResults: number, token: string) {
    const { nextPageToken, results } = await this.repository.listPaginate(maxResults, token);

    return { nextPageToken: nextPageToken, results: results };
  }
}
