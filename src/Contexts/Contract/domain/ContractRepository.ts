import { Contract } from "./Contract";

export interface ContractRepository {
    /**
    * Initialize contract process.
    * @param contract - Instance contract.
    *
    * @returns A promise void.
    */
    create(contract: Contract): Promise<void>;
    /**
    * Contract no verified.
    * @returns A promise array seller contract.
    */
    unverified(): Promise<Array<Contract>>;
}