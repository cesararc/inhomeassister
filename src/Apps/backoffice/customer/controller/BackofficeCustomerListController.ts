import { Request, Response } from "express";
import httpStatus from "http-status";
import { BackofficeCustomerResponse } from "../../../../Contexts/Backoffice/Customer/application/BackofficeCustomerResponse";
import { BackofficeCustomerListQuery } from "../../../../Contexts/Backoffice/Customer/application/list/BackofficeCustomerListQuery";
import { BackofficeCustomer } from "../../../../Contexts/Backoffice/Customer/domain/BackofficeCustomer";
import { QueryBus } from "../../../../Contexts/Shared/domain/QueryBus";
import { Controller } from "../../../controller/Controller";

export class BackofficeCustomerListController implements Controller {
  constructor(private queryBus: QueryBus) { }

  async run(req: Request, res: Response): Promise<void> {
    const limitOfDocuments = Number(req.params.limit);
    const token = req.params.token;

    try {
      const query = new BackofficeCustomerListQuery(limitOfDocuments, token);

      const { results, nextPageToken }: BackofficeCustomerResponse = await this.queryBus.ask(query);

      const response = { results: this.toResponse(results), nextPageToken };

      res.status(httpStatus.CREATED).send(response);

    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }

  private toResponse(customers: Array<BackofficeCustomer>) {
    return customers.map(customer => ({
      id: customer.id.toString(),
      displayName: customer.displayName.toString(),
      phone: customer.phone.toString(),
      email: customer.email.toString()
    }));
  }
}
