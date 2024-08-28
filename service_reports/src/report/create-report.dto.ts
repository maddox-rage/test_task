import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'Название сервиса',
    example: 'http://localhost:3000',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @ApiProperty({ description: 'Эндпоинт', example: '/data', required: true })
  @IsNotEmpty()
  @IsString()
  endpoint: string;

  @ApiProperty({
    description: 'Заголовки',
    type: String,
    isArray: true,
    example: ['id', 'name', 'email'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  headers: string[];
}
