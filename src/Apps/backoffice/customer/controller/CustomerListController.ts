import { Request, Response } from "express";
import httpStatus from "http-status";
import { CustomerListQuery } from "../../../../Contexts/Backoffice/Customer/application/list/CustomerListQuery";
import { QueryBus } from "../../../../Contexts/Shared/domain/QueryBus";
import { Controller } from "../../../controller/Controller";

export class CustomerListController implements Controller {
  constructor(private queryBus: QueryBus) { }

  async run(req: Request, res: Response): Promise<void> {
    const limitOfDocuments = Number(req.params.limit);
    const token = req.params.token;

    try {
      const query = new CustomerListQuery(limitOfDocuments, token);
      const result = await this.queryBus.ask(query)
      res.status(httpStatus.CREATED).send(result)
    } catch (error) {
      console.log({ error });
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
