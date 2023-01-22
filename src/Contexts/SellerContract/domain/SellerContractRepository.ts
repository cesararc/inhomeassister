import { SellerContract } from "./SellerContract";

export interface SellerContractRepository {
    create(contract: any): Promise<void>;
}