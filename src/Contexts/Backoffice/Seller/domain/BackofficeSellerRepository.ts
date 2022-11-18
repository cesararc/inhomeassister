import { PaginateNextToken } from "../../shared/PaginateNextToken";
import { BackofficeSeller } from "./BackofficeSeller";

export interface BackofficeSellerRepository {
  listPaginate(
    limitOfDocuments: number,
    pageToken: string
  ): Promise<PaginateNextToken<BackofficeSeller>>;
}
