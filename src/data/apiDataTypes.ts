import {RoomActivitySchema} from './dataTypes.ts'

export interface GenericError {
    detail: string
}

export interface LoginRedirectTarget {
    target: string
}

export enum RoomActivityResponseType {
    none = 'none',
    live = 'live',
    upcoming = 'upcoming'
}

export interface RoomActivityResponseSchema {
    type: RoomActivityResponseType
    activity: RoomActivitySchema | null
}
