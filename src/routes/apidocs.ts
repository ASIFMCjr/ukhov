import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "../../openapi/openapi.json";
import path from "path";

export const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(openapiDoc));

router.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../../openapi/openapi.json"))
);
