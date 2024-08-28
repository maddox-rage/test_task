import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReportService } from './report.service';
import { CreateReportDto } from './create-report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Генерация отчета' })
  @ApiBody({
    type: CreateReportDto,
    description: 'Данные для генерации отчета',
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @ApiResponse({
    status: 200,
    description: 'Задача по генерации отчета успешно создана',
    schema: { example: { taskId: 1 } },
  })
  async generateReport(@Body() createReportDto: CreateReportDto) {
    const taskId = await this.reportService.createReportTask(
      createReportDto.serviceName,
      createReportDto.endpoint,
      createReportDto.headers,
    );
    return { taskId };
  }

  @Get('status/:id')
  @ApiOperation({ summary: 'Получить статус отчета' })
  @ApiParam({ name: 'id', required: true, description: 'ID задачи отчета' })
  @ApiResponse({
    status: 200,
    description: 'Статус задачи отчета',
    schema: {
      example: {
        id: 9,
        status: 'COMPLETED',
        fileUrl: './reports/report-9.xlsx',
        createdAt: '2024-08-28T10:19:16.438Z',
      },
    },
  })
  async getReportStatus(@Param('id') id: string) {
    return await this.reportService.getReportStatus(Number(id));
  }
}
