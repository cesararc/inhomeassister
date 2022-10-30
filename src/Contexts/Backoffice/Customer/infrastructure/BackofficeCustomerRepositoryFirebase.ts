import { auth } from "../../../../Apps/database";
import { PaginateNextToken } from "../../shared/PaginateNextToken";
import { BackofficeCustomer } from '../domain/BackofficeCustomer';
import { BackofficeCustomerRepository } from '../domain/BackofficeCustomerRepository';

export class BackofficeCustomerRepositoryFirebase implements BackofficeCustomerRepository {

    async listPaginate(limitOfDocuments: number, token: string): Promise<PaginateNextToken<BackofficeCustomer>> {
        const { pageToken, users } = await auth.listUsers(limitOfDocuments);

        users.map((e) => console.log(e))
        const customers = users.map((e) => BackofficeCustomer.fromPrimitives({ uid: e.uid, displayName: e.displayName, phoneNumber: e.phoneNumber, email: e.email }));

        return { nextPageToken: pageToken, results: customers }
    }

}