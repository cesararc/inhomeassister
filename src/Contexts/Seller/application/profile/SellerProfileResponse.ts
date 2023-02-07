import { Seller } from '../../domain/Seller';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class SellerProfileResponse {
    userRecord: UserRecord;
    seller: Seller;

    constructor(userRecord: UserRecord, seller: Seller) {
        this.userRecord = userRecord;
        this.seller = seller;
    }
}