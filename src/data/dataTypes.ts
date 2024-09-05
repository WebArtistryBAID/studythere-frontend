export interface UserSchema {
    seiueID: number
    eduID: string
    name: string
    permissions: string
    pinyin: string | null
}

export interface RoomActivitySchema {
    id: number
    name: string
    day: number
    people: string
    roomId: number
    periodId: number
    contributor: UserSchema | null
}

export interface RoomSchema {
    id: string
    description: string
    activities: RoomActivitySchema[]
}

export interface PeriodSchema {
    id: number
    startTime: string
    endTime: string
}
