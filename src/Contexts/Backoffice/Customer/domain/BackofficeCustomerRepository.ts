import { PaginateNextToken } from '../../shared/PaginateNextToken';
import { BackofficeCustomer } from './BackofficeCustomer';

export interface BackofficeCustomerRepository {
    listPaginate(limitOfDocuments: number, pageToken: string): Promise<PaginateNextToken<BackofficeCustomer>>;
}