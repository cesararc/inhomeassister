
export class CustomerRewardPointNotExist extends Error {
    constructor() {
        super("Customer reward point not found, you don't have points yet.");
    }
}