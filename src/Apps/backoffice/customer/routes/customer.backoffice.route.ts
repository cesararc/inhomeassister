import { Router, Request, Response } from "express";
import container from "../../../dependency-injection";
import { CustomerListController } from "../controller/CustomerListController";

export const register = (router: Router) => {
  const customerListController = container.get<CustomerListController>(
    "Apps.Backoffice.customer.controller.BackofficeCustomerListController"
  );

  router.get("api/customer/:limit/:token", (req: Request, res: Response) =>
    customerListController.run(req, res)
  );
};
