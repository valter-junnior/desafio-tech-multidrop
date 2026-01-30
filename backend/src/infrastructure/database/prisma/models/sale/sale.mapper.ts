import { SaleEntity } from '../../../../../core/entities/sale.entity';
import {
  SalePersistenceWithRelations,
  CreateSalePersistence,
} from './sale-persistence.type';
import { ProductMapper } from '../product/product.mapper';
import { UserMapper } from '../user/user.mapper';

export class SaleMapper {
  static toDomain(persistence: SalePersistenceWithRelations): SaleEntity {
    return new SaleEntity(
      persistence.id,
      persistence.value,
      persistence.productId,
      persistence.customerId,
      persistence.partnerId,
      persistence.createdAt,
      persistence.product ? ProductMapper.toDomain(persistence.product) : undefined,
      persistence.customer ? UserMapper.toDomain(persistence.customer) : undefined,
      persistence.partner ? UserMapper.toDomain(persistence.partner) : undefined,
    );
  }

  static toPersistence(entity: SaleEntity): CreateSalePersistence {
    return {
      value: entity.value,
      productId: entity.productId,
      customerId: entity.customerId,
      partnerId: entity.partnerId,
    };
  }

  static toDomainArray(persistenceArray: SalePersistenceWithRelations[]): SaleEntity[] {
    return persistenceArray.map((persistence) => this.toDomain(persistence));
  }
}
