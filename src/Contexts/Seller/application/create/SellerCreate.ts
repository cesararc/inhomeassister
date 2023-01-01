import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';
import { Seller } from '../../domain/Seller';
import { EventBus } from '../../../Shared/domain/EventBus';

export class SellerCreate {
    constructor(private repository: SellerRepository, private eventBus: EventBus) { }

    async run(uid: SellerUid, address: SellerAddress, dni: SellerDni): Promise<void> {
        const serviceProvider = Seller.create(uid, address, dni);

        await this.repository.create(serviceProvider);

        await this.eventBus.publish(serviceProvider.pullDomainEvents());
    }
}