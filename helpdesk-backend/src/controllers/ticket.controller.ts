import { Router, Request, Response, NextFunction } from "express";
import { TicketService } from "../services/ticket.service";
import { ValidateSchema } from "../middlewares/validateSchema.middleware";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../schemas/validationSchemas";

const router = Router();
const service = new TicketService();

// GET tickets (optional filter by title)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, sort } = req.query as any;
    const tickets = await service.findAll(status, sort);
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

// CREATE ticket
router.post(
  "/",
  ValidateSchema(createTicketSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketData = req.body;
      const result = await service.create(ticketData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE ticket
router.post(
  "/:id",
  ValidateSchema(updateTicketSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketId = Number(req.params.id);
      const ticketData = req.body;
      const result = await service.update(ticketId, ticketData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  ValidateSchema(updateTicketSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.getticketById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
