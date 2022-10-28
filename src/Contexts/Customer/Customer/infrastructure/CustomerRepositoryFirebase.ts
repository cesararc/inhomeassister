import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { auth } from '../../../../Apps/database';
import { PaginateNextToken } from "../../../Backoffice/customer/customer/shared/PaginateNextToken";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export class CustomerRepositoryFirebase implements CustomerRepository {

    async create(customer: Customer): Promise<void> {

        const user = {
            displayname: customer.displayname.value,
            email: customer.email.value,
            phone: customer.phone.value,
            password: customer.password.value,
            uid: customer.id.value
        }

        await auth.createUser(user);
    }

    customerMapAttr(customer: UserRecord) {
        return {
          email: customer.email,
          displayname: customer.displayName,
          uid: customer.uid,
          phone: customer.phoneNumber,
          password: customer.passwordHash
        }
    }

}