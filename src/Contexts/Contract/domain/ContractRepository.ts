import { Contract } from "./Contract";
import { UserRecordUid } from '../../UserRecord/domain/UserRecordUid';
import { ContractUid } from "./ContractUid";
import { ContractVerifiedAt } from './ContractVerifiedAt';

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
    /**
    * rejection of a contract for documentation reasons or contract approval reasons.
    * * @param uid uid contract
    * * @param verifiedAt uid contract
    *
    * @returns A promise void.
    */
    contractReject(uid: ContractUid, verifiedAt: ContractVerifiedAt): Promise<void>;
}