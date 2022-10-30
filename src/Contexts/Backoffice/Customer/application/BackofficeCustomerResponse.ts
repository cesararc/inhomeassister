import { BackofficeCustomer } from '../domain/BackofficeCustomer';

export class BackofficeCustomerResponse {
  results: Array<BackofficeCustomer>;
  nextPageToken: string;

  constructor(results: Array<BackofficeCustomer>, nextPageToken: string) {
    this.results = results;
    this.nextPageToken = nextPageToken;
  }
}