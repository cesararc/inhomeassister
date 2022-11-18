import { auth } from "../../../../Apps/database";
import { PaginateNextToken } from "../../shared/PaginateNextToken";
import { BackofficeSeller } from "../domain/BackofficeSeller";
import { BackofficeSellerRepository } from "../domain/BackofficeSellerRepository";

export class BackofficeSellerRepositoryFirebase implements BackofficeSellerRepository {
    async listPaginate(limitOfDocuments: number, token: string): Promise<PaginateNextToken<BackofficeSeller>> {
        const { pageToken, users } = await auth.listUsers(limitOfDocuments, token);

        const seller = users.map((e) => BackofficeSeller.fromPrimitives({ uid: e.uid, displayname: e.displayName, phone: e.phoneNumber, email: e.email }));

        return { nextPageToken: pageToken, results: seller }
    }
}