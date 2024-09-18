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

    const dashboardMovieData = useQuery({
        queryKey: ['dashboard-movie-data'],
        queryFn: () =>
            Promise.all(
                movieGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "movie")),
            ),
        enabled: !!movieGenres.data,
    })

    const dashboardTvData = useQuery({
        queryKey: ['dashboard-tv-data'],
        queryFn: () =>
            Promise.all(
                tvGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "tv")),
            ),
        enabled: !!tvGenres.data,
    })

    console.log(dashboardMovieData.data)

    return (
        <main className='dashboard'>
            <h2>Movies</h2>
            {
                dashboardMovieData.data && dashboardMovieData.data.map((data: any) => (
                    <h3 key={data.name}>{data.name} - ({data.totalResults})</h3>
                ))
            }

            <h2>Series</h2>
            {
                dashboardTvData.data && dashboardTvData.data.map((data: any) => (
                    <h3 key={data.name}>{data.name} - ({data.totalResults})</h3>
                ))
            }

        </main>
    )
}
