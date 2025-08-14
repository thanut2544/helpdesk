import { TicketRepository } from "../repositories/ticket.repository";
import { IResultService } from "../middlewares/service.interface";
import { AppDataSource } from "../data-source";

export class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository(AppDataSource);
  }

  public async findAll(
    status: string,
    sort: string
  ): Promise<IResultService<any>> {
    if (sort === "latestUpdate") {
      sort = "ASC";
    }
    if (status === "all") {
      const result = await this.ticketRepository.findAll(sort);
      if (result.error) {
        return {
          status: {
            isSuccess: false,
            code: "S000002",
            message: "Database Error",
          },
          data: {},
        };
      }
      return {
        status: {
          isSuccess: true,
          code: "S000001",
          message: "Success",
        },
        data: result,
      };
    } else {
      const result = await this.ticketRepository.findByStatus(status, sort);

      if (result.error) {
        return {
          status: {
            isSuccess: false,
            code: "S000002",
            message: "Database Error",
          },
          data: {},
        };
      }
      return {
        status: {
          isSuccess: true,
          code: "S000001",
          message: "Success",
        },
        data: result,
      };
    }
  }

  public async create(ticketData: any): Promise<IResultService<any>> {
    const result = await this.ticketRepository.create(ticketData);
    if (result.error) {
      return {
        status: {
          isSuccess: false,
          code: "S000002",
          message: "Database Error",
        },
        data: {},
      };
    }
    return {
      status: {
        isSuccess: true,
        code: "S000001",
        message: "Success",
      },
      data: {},
    };
  }

  public async update(
    id: number,
    ticketData: any
  ): Promise<IResultService<any>> {
    const result = await this.ticketRepository.update(id, ticketData);
    if (result.error) {
      return {
        status: {
          isSuccess: false,
          code: "S000002",
          message: "Database Error",
        },
        data: {},
      };
    }
    return {
      status: {
        isSuccess: true,
        code: "S000001",
        message: "Success",
      },
      data: {},
    };
  }

  public async getticketById(id: number): Promise<IResultService<any>> {
    const result = await this.ticketRepository.getticketById(id);

    if (result.error) {
      return {
        status: {
          isSuccess: false,
          code: "S000002",
          message: "Database Error",
        },
        data: {},
      };
    }
    return {
      status: {
        isSuccess: true,
        code: "S000001",
        message: "Success",
      },
      data: result,
    };
  }
}
