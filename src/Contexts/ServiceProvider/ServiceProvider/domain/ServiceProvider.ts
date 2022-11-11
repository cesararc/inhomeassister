import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { ServiceProviderAddress } from './ServiceProviderAddress';
import { ServiceProviderUid } from "./ServiceProviderUid";
import { ServiceProviderDescription } from './ServiceProviderDescription';
import { ServiceProviderDni } from './ServiceProviderDni';
import { ServiceProviderCreatedDomainEvent } from './ServiceProviderCreatedDomainEvent';

export class ServiceProvider extends AggregateRoot {

    readonly uid: ServiceProviderUid;
    readonly address: ServiceProviderAddress;
    readonly dni: ServiceProviderDni;
    readonly description: ServiceProviderDescription;

    constructor(uid: ServiceProviderUid, address: ServiceProviderAddress, dni: ServiceProviderDni, description: ServiceProviderDescription) {
        super();
        this.uid = uid;
        this.address = address;
        this.dni = dni;
        this.description = description;
    }

    static create(uid: ServiceProviderUid, address: ServiceProviderAddress, dni: ServiceProviderDni, description: ServiceProviderDescription): ServiceProvider {

        const serviceProvider = new ServiceProvider(uid, address, dni, description);

        serviceProvider.record(new ServiceProviderCreatedDomainEvent({ uid: uid.value }));

        return serviceProvider;
    }

    static fromPrimitives(plainData: { uid: string; address: string; dni: string; description: string; }) {
        return new ServiceProvider(
            new ServiceProviderUid(plainData.uid),
            new ServiceProviderAddress(plainData.address),
            new ServiceProviderDni(plainData.dni),
            new ServiceProviderDescription(plainData.description)
        );
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            address: this.address.value,
            dni: this.dni.value,
            description: this.description.value,
        }
    }
}