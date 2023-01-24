import { Contract } from "./Contract";
import { UserRecordUid } from '../../UserRecord/domain/UserRecordUid';

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
    * * @param uid - Instance contract.
    *
    * @returns A promise array seller contract.
    */
    unverified(uid: UserRecordUid): Promise<Array<Contract>>;
}