import { BackofficeSeller } from "../domain/BackofficeSeller";

export class BackofficeSellerResponse {
    results: Array<BackofficeSeller>;
    nextPageToken: string;
  
    constructor(results: Array<BackofficeSeller>, nextPageToken: string) {
      this.results = results;
      this.nextPageToken = nextPageToken;
    }
}