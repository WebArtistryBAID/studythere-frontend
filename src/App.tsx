import {Route, Routes, useLocation} from 'react-router-dom'
import PageHome from './pages/PageHome.tsx'
import PageRoom from './pages/PageRoom.tsx'

function App() {
    const location = useLocation()

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route index element={<PageHome/>}/>
                <Route path="order" element={<PageRoom/>}/>
            </Routes>
        </>
    )
}

export default App
