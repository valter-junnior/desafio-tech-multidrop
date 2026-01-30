import type { SaleEntity } from '../entities/sale.entity';
import type { CreateSaleDto } from '../../application/dtos/sale/create-sale.dto';

export interface ISaleRepository {
  create(data: CreateSaleDto): Promise<SaleEntity>;
  findAll(skip?: number, take?: number): Promise<SaleEntity[]>;
  findById(id: number): Promise<SaleEntity | null>;
  findByPartner(partnerId: number): Promise<SaleEntity[]>;
  count(): Promise<number>;
}

export const SALE_REPOSITORY = Symbol('ISaleRepository');
