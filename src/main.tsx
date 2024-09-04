import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './i18n'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback="Loading languages...">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    </StrictMode>
)
