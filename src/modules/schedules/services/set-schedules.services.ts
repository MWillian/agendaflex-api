import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from '../repositories/schedules.repository';

interface SetSchedulesServiceRequest {
    userId: string;
    schedules: {
        weekDay: number;
        timeStartInMinutes: number;
        timeEndInMinutes: number;
    }[];
}

@Injectable()
export class SetSchedulesService {
    constructor(private schedulesRepository: SchedulesRepository) { }

    async execute({ userId, schedules }: SetSchedulesServiceRequest): Promise<void> {
        const schedulesToCreate = schedules.map((item) => ({
            userId,
            weekDay: item.weekDay,
            timeStartInMinutes: item.timeStartInMinutes,
            timeEndInMinutes: item.timeEndInMinutes,
        }));

        await this.schedulesRepository.replaceUserSchedules(userId, schedulesToCreate);
    }
}