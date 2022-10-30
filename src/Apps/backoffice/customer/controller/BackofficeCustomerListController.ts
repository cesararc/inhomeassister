import { Request, Response } from "express";
import httpStatus from "http-status";
import { BackofficeCustomerListQuery } from "../../../../Contexts/Backoffice/Customer/application/list/BackofficeCustomerListQuery";
import { BackofficeCustomer } from "../../../../Contexts/Backoffice/Customer/domain/BackofficeCustomer";
import { QueryBus } from "../../../../Contexts/Shared/domain/QueryBus";
import { Controller } from "../../../controller/Controller";
import { BackofficeCustomerResponse } from '../../../../Contexts/Backoffice/Customer/application/BackofficeCustomerResponse';

export class BackofficeCustomerListController implements Controller {
  constructor(private queryBus: QueryBus) { }

  async run(req: Request, res: Response): Promise<void> {
    const limitOfDocuments = Number(req.params.limit);
    const token = req.params.token;

    console.log(req.params)

    try {
      const query = new BackofficeCustomerListQuery(limitOfDocuments, token);

      const result: BackofficeCustomerResponse = await this.queryBus.ask(query);

      const response = { results: this.toResponse(result.customer), nextPageToken: "" };

      res.status(httpStatus.CREATED).send(response);

    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }

  private toResponse(customers: Array<BackofficeCustomer>) {
    return customers.map(customer => ({
      id: customer.id.toString(),
      displayName: customer.displayname.toString(),
      phone: customer.phone.toString(),
      email: customer.email.toString()
    }));
  }
}
