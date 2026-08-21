import { Module } from '@nestjs/common';
import { SchedulesRepository } from './repositories/schedules.repository';
import { PrismaSchedulesRepository } from './repositories/prisma/prisma-schedules.repository';
import { AuthModule } from '../auth/auth.module';
import { SetSchedulesController } from './controllers/set-schedules.controller';
import { SetSchedulesService } from './services/set-schedules.services';

@Module({
  imports: [AuthModule],
  controllers: [SetSchedulesController],
  providers: [
    SetSchedulesService,
    {
      provide: SchedulesRepository,
      useClass: PrismaSchedulesRepository,
    },
  ],
  exports: [SchedulesRepository],
})
export class SchedulesModule {}