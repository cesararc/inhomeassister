import { Contract } from '../../domain/Contract';

export class ContractUnverifiedResponse {
    contract: Contract[];

    constructor(contract: Contract[]) {
        this.contract = contract;
    }
}