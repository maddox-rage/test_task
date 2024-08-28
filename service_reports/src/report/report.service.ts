import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as XLSX from 'xlsx';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async createReportTask(
    serviceName: string,
    endpoint: string,
    headers: string[],
  ): Promise<number> {
    const task = await this.prisma.reportTask.create({
      data: {},
    });

    this.generateReport(task.id, serviceName, endpoint, headers);

    return task.id;
  }

  private async generateReport(
    taskId: number,
    serviceName: string,
    endpoint: string,
    headers: string[],
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${serviceName}${endpoint}`),
      );
      const data = response.data;

      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

      const fileName = `./reports/report-${taskId}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      await this.prisma.reportTask.update({
        where: { id: taskId },
        data: {
          status: 'COMPLETED',
          fileUrl: fileName,
        },
      });
    } catch (error) {
      await this.prisma.reportTask.update({
        where: { id: taskId },
        data: {
          status: 'FAILED',
        },
      });
    }
  }

  async getReportStatus(taskId: number) {
    const report = await this.prisma.reportTask.findUnique({
      where: { id: taskId },
    });
    if (!report) {
      throw new HttpException('Report not found', HttpStatus.BAD_REQUEST);
    }
    return report;
  }
}
