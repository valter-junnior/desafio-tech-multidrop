import { Module } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserRepositoryPrisma } from '../database/prisma/repositories/user-repository.prisma';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';

@Module({
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
