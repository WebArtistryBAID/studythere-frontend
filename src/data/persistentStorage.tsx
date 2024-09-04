import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { type UserSchema } from './dataTypes.ts'
import { jwtDecode } from 'jwt-decode'

export interface PersistentStorage {
    getToken: () => string | null
    setToken: (token: string | null) => void
    decodeToken: () => UserSchema | null
}

const PersistentStorageContext = createContext<PersistentStorage>(null as unknown as PersistentStorage)
export const usePersistentStorage = (): any => useContext(PersistentStorageContext)

export function PersistentStorageProvider({ children }: { children: ReactNode }): JSX.Element {
    const [token, setTokenT] = useState<string | null>(localStorage.getItem('token'))

    useEffect(() => {
        if (token == null) {
            localStorage.removeItem('token')
            return
        }
        localStorage.setItem('token', token)
    }, [token])

    function getToken(): string | null {
        if (token == null) {
            return null
        }
        if (Date.now() > jwtDecode(token).exp! * 1000) {
            setToken(null)
            return null
        }
        return token
    }

    function setToken(token: string | null): void {
        setTokenT(token)
    }

    function decodeToken(): UserSchema | null {
        const token = getToken()
        if (token == null) {
            return null
        }
        const decoded = jwtDecode<any>(token)
        return {
            seiueID: decoded.seiueID,
            eduID: decoded.eduID,
            name: decoded.name,
            permissions: decoded.permissions,
            pinyin: null
        }
    }

    return (
        <PersistentStorageContext.Provider value={{
            getToken,
            setToken,
            decodeToken
        }}>
            {children}
        </PersistentStorageContext.Provider>
    )
}