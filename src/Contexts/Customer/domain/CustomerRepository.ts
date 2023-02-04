import { UserRecordDisplayName } from "../../UserRecord/domain/UserRecordDisplayName";
import { Customer } from "./Customer";
import { CustomerDni } from './CustomerDni';
import { CustomerUid } from './CustomerUid';
import { Nullable } from '../../Shared/domain/Nullable';

export interface CustomerRepository {
    /**
    * Create a customer
    * @param customer - Customer entitie
    *
    * @returns A promise void.
    */
    create(customer: Customer): Promise<void>;
    /**
    * Profile customer entitie
    * @param uid - Profile customer uid
    *
    * @returns A promise with customer
    */
    profile(uid: CustomerUid): Promise<Customer>;
    /**
    * Update customer profile entitie
    * @param customer - Entitie customer
    *
    * @returns A promise void.
    */
    update(customer: Customer): Promise<void>;
    /**
    * Matching customer by dni
    * @param customer - Entitie customer
    *
    * @returns A promise customer.
    */
    matching(criteria: CustomerDni): Promise<Nullable<Customer>>;
}