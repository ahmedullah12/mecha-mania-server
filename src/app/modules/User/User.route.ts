import { Router } from "express";
import { UserController } from "./User.controller";

const router = Router();

router.post("/webhooks", UserController.clerkWebhooks);

export const UserRoutes = router;