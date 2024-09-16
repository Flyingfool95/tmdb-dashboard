import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Categories from './routes/Categories'
import Dashboard from './routes/Dashboard'
import Favorites from './routes/Favorites'
import Media from './routes/Media'
import App from './App'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1>404</h1>,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/media/:mediaId',
                element: <Media />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
            },
        ],
    },



])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
