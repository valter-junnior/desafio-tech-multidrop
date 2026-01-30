import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../auth/decorators/public.decorator';

class GenerateTokenDto {
  userId: string;
  email: string;
  role: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Public()
  @Post('generate-token')
  @ApiOperation({ 
    summary: 'Gerar token JWT para testes',
    description: 'Endpoint público para gerar tokens JWT fake para desenvolvimento/testes'
  })
  @ApiResponse({ status: 201, description: 'Token gerado com sucesso' })
  async generateToken(@Body() dto: GenerateTokenDto) {
    const payload = { sub: dto.userId, email: dto.email, role: dto.role };
    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }
}
