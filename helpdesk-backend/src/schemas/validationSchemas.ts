import Joi from "joi";

export const createTicketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  contactInfo: Joi.string().required(),
  status: Joi.string().optional()
});

export const updateTicketSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  contactInfo: Joi.string().optional(),
  status: Joi.string().optional()
});
