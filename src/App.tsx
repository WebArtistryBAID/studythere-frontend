import { Route, Routes, useLocation } from 'react-router-dom'
import PageHome from './home/PageHome.tsx'
import PageRoom from './room/PageRoom.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistentStorageProvider } from './data/persistentStorage.tsx'
import PageLogin from './login/PageLogin.tsx'
import PageLoginOnboarding from './login/PageLoginOnboarding.tsx'

const queryClient = new QueryClient()


function App() {
    const location = useLocation()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <PersistentStorageProvider>
                    <Routes location={location} key={location.pathname}>
                        <Route index element={<PageHome/>}/>
                        <Route path="room" element={<PageRoom/>}/>
                        <Route path="login/oauth2/:redirect" element={<PageLogin/>}/>
                        <Route path="login/onboarding/:redirect" element={<PageLoginOnboarding/>}/>
                    </Routes>
                </PersistentStorageProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
