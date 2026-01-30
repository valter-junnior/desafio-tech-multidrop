import { ApiProperty } from '@nestjs/swagger';
import { SaleEntity } from '../../../core/entities/sale.entity';

export class SalePresenter {
  @ApiProperty({ description: 'ID da venda', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID do produto', example: 1 })
  productId: number;

  @ApiProperty({ description: 'ID do cliente', example: 2 })
  customerId: number;

  @ApiProperty({ description: 'ID do parceiro', example: 3 })
  partnerId: number;

  @ApiProperty({ description: 'Valor da venda', example: 1500.00 })
  value: number;

  @ApiProperty({ description: 'Data de criação', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  constructor(sale: SaleEntity) {
    this.id = sale.id;
    this.productId = sale.productId;
    this.customerId = sale.customerId;
    this.partnerId = sale.partnerId;
    this.value = sale.value;
    this.createdAt = sale.createdAt;
  }

  static fromEntity(sale: SaleEntity): SalePresenter {
    return new SalePresenter(sale);
  }
}

export class SaleDetailPresenter extends SalePresenter {
  @ApiProperty({ description: 'Dados do produto', required: false })
  product?: {
    id: number;
    name: string;
    price: number;
  };

  @ApiProperty({ description: 'Dados do cliente', required: false })
  customer?: {
    id: number;
    name: string;
    email: string;
  };

  @ApiProperty({ description: 'Dados do parceiro', required: false })
  partner?: {
    id: number;
    name: string;
    email: string;
  };

  constructor(sale: SaleEntity) {
    super(sale);
    
    if (sale.product) {
      this.product = {
        id: sale.product.id,
        name: sale.product.name,
        price: sale.product.price,
      };
    }

    if (sale.customer) {
      this.customer = {
        id: sale.customer.id,
        name: sale.customer.name,
        email: sale.customer.email,
      };
    }

    if (sale.partner) {
      this.partner = {
        id: sale.partner.id,
        name: sale.partner.name,
        email: sale.partner.email,
      };
    }
  }

  static fromEntity(sale: SaleEntity): SaleDetailPresenter {
    return new SaleDetailPresenter(sale);
  }
}
