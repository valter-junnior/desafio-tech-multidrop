import { ProductPersistence } from '../product/product-persistence.type';
import { UserPersistence } from '../user/user-persistence.type';

export interface SalePersistence {
  id: number;
  value: number;
  productId: number;
  customerId: number;
  partnerId: number;
  createdAt: Date;
}

export interface SalePersistenceWithRelations extends SalePersistence {
  product?: ProductPersistence;
  customer?: UserPersistence;
  partner?: UserPersistence;
}

export type CreateSalePersistence = Omit<SalePersistence, 'id' | 'createdAt'>;
