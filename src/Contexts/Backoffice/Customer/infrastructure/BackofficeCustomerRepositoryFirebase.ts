import { auth } from "../../../../Apps/database";
import { PaginateNextToken } from "../../shared/PaginateNextToken";
import { BackofficeCustomer } from '../domain/BackofficeCustomer';
import { BackofficeCustomerRepository } from '../domain/BackofficeCustomerRepository';

export class BackofficeCustomerRepositoryFirebase implements BackofficeCustomerRepository {

    async listPaginate(limitOfDocuments: number, token: any): Promise<PaginateNextToken<BackofficeCustomer>> {
        const { pageToken, users } = await auth.listUsers(limitOfDocuments, token);

        const customers = users.map((e) => BackofficeCustomer.fromPrimitives({ uid: e.uid, displayName: e.displayName, phoneNumber: e.phoneNumber, email: e.email }));

        return { nextPageToken: pageToken, results: customers }
    }

}