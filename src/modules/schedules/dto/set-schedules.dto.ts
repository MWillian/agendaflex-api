import {z} from "zod"

const scheduleItemSchema = z.object({
    weekDay: z.number().int().min(0).max(6),
    timeStartInMinutes: z.number().int().min(0).max(1440),
    timeEndInMinutes: z.number().int().min(0).max(1440)
}).refine((data) => data.timeStartInMinutes < data.timeEndInMinutes, {
    message: 'Start time must be befome end time',
    path: ['timeEndInMinutes']
})

export const setScheduleBodySchema = z.object({
    schedules: z.array(scheduleItemSchema).min(1, 'At least one schedule must be provided')
})

export type SetScheduleBodySchema = z.infer<typeof setScheduleBodySchema>