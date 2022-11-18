import { Request, Response } from "express";
import httpStatus from "http-status";
import { BackofficeSellerResponse } from "../../../../Contexts/Backoffice/Seller/application/BackofficeSellerResponse";
import { BackofficeSellerListQuery } from "../../../../Contexts/Backoffice/Seller/application/list/BackofficeSellerListQuery";
import { BackofficeSeller } from "../../../../Contexts/Backoffice/Seller/domain/BackofficeSeller";
import { QueryBus } from "../../../../Contexts/Shared/domain/QueryBus";
import { Controller } from "../../../controller/Controller";

export class BackofficeSellerListController implements Controller {
  constructor(private queryBus: QueryBus) {}
  
  async run(req: Request, res: Response): Promise<void> {
    const limitOfDocuments = Number(req.params.limit);
    const token = req.params.token;

    try {
      const query = new BackofficeSellerListQuery(limitOfDocuments, token);

      const { results, nextPageToken }: BackofficeSellerResponse = await this.queryBus.ask(query);

      const response = { results: this.toResponse(results), nextPageToken };

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }

  private toResponse(sellers: Array<BackofficeSeller>) {
    return sellers.map(seller => ({
      id: seller.id.toString(),
      displayname: seller.displayname.toString(),
      phone: seller.phone.toString(),
      email: seller.email.toString()
    }));
  }
}
