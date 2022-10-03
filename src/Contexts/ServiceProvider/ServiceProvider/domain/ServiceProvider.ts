import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { ServiceProviderDisplayName } from "./ServiceProviderDisplayName";
import { ServiceProviderUid } from "./ServiceProviderUid";
import { ServiceProviderPhone } from './ServiceProviderPhone';
import { ServiceProviderEmail } from './ServiceProviderEmail';
import { ServiceProviderPassword } from './ServiceProviderPassword';
import { ServiceProviderDisabled } from './ServiceProviderDisabled';

export class ServiceProvider extends AggregateRoot {

    readonly id: ServiceProviderUid;
    readonly displayname: ServiceProviderDisplayName;
    readonly phone: ServiceProviderPhone;
    readonly email: ServiceProviderEmail;
    readonly password: ServiceProviderPassword;
    readonly disabled: ServiceProviderDisabled;

    constructor(id: ServiceProviderUid, disabled: ServiceProviderDisabled, displayname: ServiceProviderDisplayName, phone: ServiceProviderPhone, email: ServiceProviderEmail, password: ServiceProviderPassword) {
        super();
        this.id = id;
        this.displayname = displayname;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    static create(id: ServiceProviderUid, disabled: ServiceProviderDisabled, displayname: ServiceProviderDisplayName, phone: ServiceProviderPhone, email: ServiceProviderEmail, password: ServiceProviderPassword): ServiceProvider {

        const serviceProvider = new ServiceProvider(id, disabled, displayname, phone, email, password);

        return serviceProvider;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            disabled: this.disabled.value,
            displayname: this.displayname.value,
            email: this.email.value,
            phone: this.phone.value,
            password: this.password.value
        }
    }
}