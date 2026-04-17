import { z } from "zod";

export const ErrorResponseSchema = z.object({
  status: z.number(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  timestamp: z.string(),
  errors: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export function formatErrorResponse(
  statusCode: number,
  title: string,
  description: string,
  code: string,
  errors?: { field: string; message: string }[]
): ErrorResponse {
  return {
    status: statusCode,
    title,
    description,
    code,
    timestamp: new Date().toISOString(),
    errors,
  };
}