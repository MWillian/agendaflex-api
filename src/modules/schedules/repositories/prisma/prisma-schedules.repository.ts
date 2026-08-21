import { Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  CreateManyScheduleData,
  SchedulesRepository,
} from '../schedules.repository';

@Injectable()
export class PrismaSchedulesRepository implements SchedulesRepository {
  constructor(private prisma: PrismaService) {}

  async replaceUserSchedules(userId: string, data: CreateManyScheduleData[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.schedule.deleteMany({
        where: { userId },
      }),
      this.prisma.schedule.createMany({
        data,
      }),
    ]);
  }

  async findManyByUserIdAndWeekDay(userId: string, weekDay: number): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: {
        userId,
        weekDay,
      },
      orderBy: {
        timeStartInMinutes: 'asc',
      },
    });
  }
}