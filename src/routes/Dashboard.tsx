import useFetch from "../hooks/useFetch"
import { useQuery } from "@tanstack/react-query"


export default function Dashboard() {
    const { fetchDashboardData, fetchGenres } = useFetch();

    const movieGenres = useQuery({
        queryKey: ['movie-genres'],
        queryFn: () => fetchGenres("movie"),
    })
    const tvGenres = useQuery({
        queryKey: ['tv-genres'],
        queryFn: () => fetchGenres("tv"),
    })

    console.log(tvGenres.data)

    /*     const { data, isLoading, error } = useQuery({ 
            queryKey: ['dashboard'], 
            queryFn: fetchDashboardData,
            enabled: !!genres.data,
        }) */

    return (
        <main className='dashboard'>
            <h1>Dashboard</h1>

        </main>
    )
}
