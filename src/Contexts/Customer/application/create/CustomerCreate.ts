import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { Customer } from '../../domain/Customer';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';
import { CustomerDni } from '../../domain/CustomerDni';
import { EventBus } from '../../../Shared/domain/EventBus';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';

export class CustomerCreate {
    constructor(
        private customerRepository: CustomerRepository,
        private userRecordRepository: UserRecordRepository,
        private eventBus: EventBus) { }

    async run(
        uid: CustomerUid,
        displayName: UserRecordDisplayName,
        phoneNumber: UserRecordPhone,
        email: UserRecordEmail,
        password: UserRecordPassword,
        claim: UserRecordClaim,
        address: CustomerAddress,
        birthday: CustomerBirthday,
        dni: CustomerDni): Promise<void> {

        try {
            const userRecord = UserRecord.create(uid, displayName, phoneNumber, email, password, claim);

            await this.userRecordRepository.create(userRecord);

            const customer = Customer.create(uid, birthday, address, dni);

            await this.customerRepository.create(customer);

            await this.eventBus.publish(customer.pullDomainEvents());
        } catch (error) {
            await this.userRecordRepository.delete(uid);
        }
    }
}