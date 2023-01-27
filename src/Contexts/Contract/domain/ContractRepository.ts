import { Contract } from "./Contract";
import { UserRecordUid } from '../../UserRecord/domain/UserRecordUid';
import { ContractUid } from "./ContractUid";
import { ContractReviewedAt } from './ContractReviewedAt';
import { ContractStatus } from "./ContractStatus";

export interface ContractRepository {
    /**
    * Initialize contract process.
    * @param contract - Instance contract.
    *
    * @returns A promise void.
    */
    create(contract: Contract): Promise<void>;
    /**
    * Rejection of a contract for documentation reasons or contract approval reasons.
    * * @param uid uid contract
    * * @param verifiedAt uid contract
    * * @param status status contract
    *
    * @returns A promise void.
    */
    contractReview(uid: ContractUid, reviewedAt: ContractReviewedAt, status: ContractStatus): Promise<void>;
    /**
    * Contract no verified.
    * * @param uid - Instance contract.
    *
    * @returns A promise array seller contract.
    */
    unverified(uid: UserRecordUid): Promise<Array<Contract>>;
}