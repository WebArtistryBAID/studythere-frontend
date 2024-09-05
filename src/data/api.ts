import { PeriodSchema, RoomSchema, RoomSchemaExpanded } from './dataTypes.ts'
import { GenericError, LoginRedirectTarget, RoomActivityResponseSchema } from './apiDataTypes.ts'

export async function get(endpoint: string, query = new Map<string, string>(), token: string | null = null): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint + '?' + queryParameters.join('&'), {
        headers: {
            Authorization: token == null ? '' : `Bearer ${token}`
        }
    })
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function post(endpoint: string, body: Record<string, any>, token: string | null = null): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token == null ? '' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function patch(endpoint: string, body: Record<string, any>, token: string | null = null): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token == null ? '' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function del(endpoint: string, query = new Map<string, string>(), token: string | null = null): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint + '?' + queryParameters.join('&'), {
        method: 'DELETE',
        headers: {
            Authorization: token == null ? '' : `Bearer ${token}`
        }
    })
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function getRooms(): Promise<RoomSchema[] | GenericError> {
    return await get('rooms')
}

export async function getRoom(id: string): Promise<RoomSchemaExpanded | GenericError> {
    return await get('room', new Map([['id', id]]))
}

export async function getPeriods(): Promise<PeriodSchema[] | GenericError> {
    return await get('periods')
}

export async function getCurrentActivity(roomId: string): Promise<RoomActivityResponseSchema | GenericError> {
    return await get('room/current', new Map([['room', roomId]]))
}

export async function getLoginRedirectTarget(redirect: string): Promise<LoginRedirectTarget> {
    return await get('login', new Map([['redirect', redirect]]))
}
