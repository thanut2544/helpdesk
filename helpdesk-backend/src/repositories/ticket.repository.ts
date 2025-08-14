import { DataSource, QueryRunner } from "typeorm";
import { Ticket } from "../entities/ticket.entity";

export class TicketRepository {
  constructor(private connection: DataSource) {}

  async findAll(sort: string): Promise<any> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const selectQuery = `
        SELECT * FROM tickets
        ORDER BY createdAt ${sort.toUpperCase() === "DESC" ? "DESC" : "ASC"}
    `;

    const result = await queryRunner.query(selectQuery);

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  }

  async findByStatus(status: string, sort: string): Promise<any> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const selectQuery = `
        SELECT * FROM tickets
        WHERE status = ?
        ORDER BY createdAt ${sort.toUpperCase() === "DESC" ? "DESC" : "ASC"}
    `;

    const result = await queryRunner.query(selectQuery, [status]);

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  }

  async create(ticketData: any): Promise<any> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const insertQuery = `
      INSERT INTO tickets (title, description,contactInfo, status)
      VALUES (?, ?, ? ,?)
    `;

    const result: any = await queryRunner.query(insertQuery, [
      ticketData.title,
      ticketData.description,
      ticketData.contactInfo,
      ticketData.status || "pending",
    ]);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return result;
  }

  async update(id: number, ticketData: any): Promise<any> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const fields = Object.keys(ticketData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(ticketData);

    const updateQuery = `
      UPDATE tickets
      SET ${fields}
      WHERE id = ?
    `;

    const result: any = await queryRunner.query(updateQuery, [...values, id]);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return result;
  }

  async getticketById(id: number): Promise<any> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const selectQuery = `
        SELECT * FROM tickets
        WHERE id = ?
    `;

    const result = await queryRunner.query(selectQuery, [id]);

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  }
}
