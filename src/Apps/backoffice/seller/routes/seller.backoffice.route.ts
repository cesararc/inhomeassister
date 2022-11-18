import { Router, Request, Response } from "express";
import container from "../../../dependency-injection";

export const register = (router: Router) => {
  const sellerListController = container.get("Backoffice.seller.BackofficeSellerListController");

  router.get("/api/backoffice/seller/:limit/:token?", (req: Request, res: Response) => sellerListController.run(req, res));
};