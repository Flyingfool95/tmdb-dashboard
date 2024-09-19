import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './routes/Dashboard'
import Favorites from './routes/Favorites'
import Genre from './routes/Genre'
import Genres from './routes/Genres'
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
                path: '/movies',
                element: <Genres />,
            },
            {
                path: '/movies/:movieId',
                element: <Media />,
            },
            {
                path: '/movies/genre/:genreId',
                element: <Genre />,
            },
            {
                path: '/series',
                element: <Genres />,
            },
            {
                path: '/series/:serieId',
                element: <Media />,
            },
            {
                path: '/series/genre/:genreId',
                element: <Genre />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
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
