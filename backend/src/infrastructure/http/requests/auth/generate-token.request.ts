import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../../core/enums/user-role.enum';

export class GenerateTokenRequest {
  @ApiProperty({ 
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty({ message: 'UserId é obrigatório' })
  userId: string;

  @ApiProperty({ 
    description: 'Email do usuário',
    example: 'usuario@example.com'
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({ 
    description: 'Papel do usuário no sistema',
    enum: UserRole,
    example: UserRole.CUSTOMER
  })
  @IsEnum(UserRole, { message: 'Role deve ser ADMIN, PARTNER ou CUSTOMER' })
  @IsNotEmpty({ message: 'Role é obrigatório' })
  role: UserRole;
}
