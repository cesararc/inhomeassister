import { SellerNotFound } from '../../domain/SellerNotFound';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';
import { EventBus } from '../../../Shared/domain/EventBus';
import { SellerRepository } from '../../domain/SellerRepository';
import { Seller } from '../../domain/Seller';

export class SellerUpdate {
    constructor(private repository: SellerRepository, private eventBus: EventBus) { }

    async run(uid: SellerUid, address: SellerAddress, dni: SellerDni): Promise<void> {
        const seller = Seller.create(uid, address, dni);

        const response = await this.repository.update(seller);
        if (response === null) {
            throw new SellerNotFound();
        }

        await this.eventBus.publish(seller.pullDomainEvents());
    }
}