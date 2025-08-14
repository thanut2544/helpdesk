import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

export function ValidateSchema(schema: AnySchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}
