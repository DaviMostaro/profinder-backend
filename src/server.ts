import "dotenv/config";

import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import { mainRoutes } from "./routes/main.routes";
import { env } from "./env";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configuration/swagger.config";
import { ZodError } from "zod";
import { AppError } from "./errors/app-error";
import { formatErrorResponse } from "./errors/error-response";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(mainRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    const response = formatErrorResponse(
      err.statusCode,
      err.name,
      err.message,
      err.code
    );
    return res.status(err.statusCode).json(response);
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    const response = formatErrorResponse(
      400,
      "Validation Error",
      "Erro de validação",
      "VALIDATION_ERROR",
      errors
    );
    return res.status(400).json(response);
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  }

  const response = formatErrorResponse(
    500,
    "Internal Server Error",
    "Erro interno do servidor",
    "INTERNAL_SERVER_ERROR"
  );
  return res.status(500).json(response);
};

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT} ✔`);
});
