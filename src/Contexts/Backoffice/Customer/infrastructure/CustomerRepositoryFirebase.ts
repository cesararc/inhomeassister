import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { auth } from "../../../../../Apps/database";
import { CustomerDisplayName } from "../../../../Customer/Customer/domain/CustomerDisplayName";
import { CustomerEmail } from "../../../../Customer/Customer/domain/CustomerEmail";
import { CustomerPhone } from "../../../../Customer/Customer/domain/CustomerPhone";
import { CustomerUid } from "../../../../Customer/Customer/domain/CustomerUid";
import { Customer } from "../domain/BackofficeCustomer";
import { CustomerRepository } from "../domain/BackofficeCustomerRepository";
import { PaginateNextToken } from "../shared/PaginateNextToken";

export class CustomerRepositoryFirebase implements CustomerRepository {

    async listPaginate(maxResults: number, token: string): Promise<PaginateNextToken<Customer>> {
        const { pageToken, users } = await auth.listUsers(maxResults, token);

        const customers = users.map((e) => Customer.fromPrimitives({ uid: e.uid, displayName: e.displayName, phoneNumber: e.phoneNumber, email: e.email }));

        return { nextPageToken: pageToken, results: customers }
    }

}