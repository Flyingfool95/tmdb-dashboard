import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './routes/Dashboard'
import Genre from './routes/Genre'
import Media from './routes/Media'


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
                path: '/movies/:mediaId',
                element: <Media />,
            },
            {
                path: '/movies/genre/:genreId',
                element: <Genre />,
            },
            {
                path: '/series/:mediaId',
                element: <Media />,
            },
            {
                path: '/series/genre/:genreId',
                element: <Genre />,
            },
        ],
    },



])

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
)
