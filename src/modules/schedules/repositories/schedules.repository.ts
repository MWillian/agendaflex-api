import { Schedule } from "@prisma/client"

export interface CreateManyScheduleData {
    userId: string
    weekDay: number
    timeStartInMinutes: number
    timeEndInMinutes: number
}

export abstract class SchedulesRepository{
    abstract replaceUserSchedules(userId: string, data: CreateManyScheduleData[]) : Promise<void>
    abstract findManyByUserIdAndWeekDay(userId: string, weekDay: number): Promise<Schedule[]>
}