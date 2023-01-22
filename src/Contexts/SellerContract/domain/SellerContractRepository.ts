import { SellerContract } from "./SellerContract";

export interface SellerContractRepository {
    /**
    * Initialize contract process.
    * @param contract - Instance contract.
    *
    * @returns A promise void.
    */
    create(contract: SellerContract): Promise<void>;
}