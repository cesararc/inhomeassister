import { Request, Response } from "express";
import httpStatus from "http-status";
import { BackofficeCustomerListQuery } from "../../../../Contexts/Backoffice/Customer/application/list/BackofficeCustomerListQuery";
import { QueryBus } from "../../../../Contexts/Shared/domain/QueryBus";
import { Controller } from "../../../controller/Controller";

export class BackofficeCustomerListController implements Controller {
  constructor(private queryBus: QueryBus) { }

  async run(req: Request, res: Response): Promise<void> {
    const limitOfDocuments = Number(req.params.limit);

    const token = req.params.token;

    try {
      const query = new BackofficeCustomerListQuery(limitOfDocuments, token);

      const result = await this.queryBus.ask(query)

      res.status(httpStatus.CREATED).send(result)
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
