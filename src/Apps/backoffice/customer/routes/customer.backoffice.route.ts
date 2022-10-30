import { Router, Request, Response } from "express";
import container from "../../../dependency-injection";

export const register = (router: Router) => {
  const customerListController = container.get("Backoffice.customer.BackofficeCustomerListController");

  router.get("/api/backoffice/customer/:limit/:token?", (req: Request, res: Response) => customerListController.run(req, res));
};
