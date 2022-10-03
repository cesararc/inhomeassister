import { auth } from '../../../../Apps/database';
import { Seller } from '../domain/Seller';
import { SellerRepository } from '../domain/SellerRepository';

export class SellerRepositoryFirebase implements SellerRepository {

    async create(seller: Seller): Promise<void> {

        const user = {
            displayname: seller.displayname.value,
            email: seller.email.value,
            phone: seller.phone.value,
            password: seller.password.value,
            uid: seller.id.value
        }

        await auth.createUser(user);
    }
}