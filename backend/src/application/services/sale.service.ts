import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { CreateSaleDto } from '../dtos/sale/create-sale.dto';
import { SaleEntity } from '../../core/entities/sale.entity';
import type { ISaleRepository } from '../../core/repositories/sale.repository';
import { SALE_REPOSITORY } from '../../core/repositories/sale.repository';
import type { IUserRepository } from '../../core/repositories/user.repository';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import type { IProductRepository } from '../../core/repositories/product.repository';
import { PRODUCT_REPOSITORY } from '../../core/repositories/product.repository';

@Injectable()
export class SaleService {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    // Validar produto usando entity
    const product = await this.productRepository.findById(createSaleDto.productId);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${createSaleDto.productId} não encontrado`);
    }
    if (!product.isAvailableForSale()) {
      throw new BadRequestException('Produto não está disponível para venda');
    }

    // Validar customer usando entity
    const customer = await this.userRepository.findById(createSaleDto.customerId);
    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${createSaleDto.customerId} não encontrado`);
    }
    if (!customer.isCustomer()) {
      throw new BadRequestException('O customerId deve ser um usuário com role CUSTOMER');
    }

    // Validar partner usando entity
    const partner = await this.userRepository.findById(createSaleDto.partnerId);
    if (!partner) {
      throw new NotFoundException(`Parceiro com ID ${createSaleDto.partnerId} não encontrado`);
    }
    if (!partner.isPartner()) {
      throw new BadRequestException('O partnerId deve ser um usuário com role PARTNER');
    }

    return this.saleRepository.create(createSaleDto);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: SaleEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [sales, total] = await Promise.all([
      this.saleRepository.findAll(skip, limit),
      this.saleRepository.count(),
    ]);

    return {
      data: sales,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number): Promise<SaleEntity> {
    const sale = await this.saleRepository.findById(id);
    if (!sale) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada`);
    }
    return sale;
  }
}
