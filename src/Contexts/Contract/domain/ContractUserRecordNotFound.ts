export class ContractUserRecordNotFound extends Error {
    constructor() {
        super("The profile of one of the users to create the contract could not be found.");
    }
}