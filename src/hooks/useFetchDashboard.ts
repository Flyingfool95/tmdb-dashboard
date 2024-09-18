import { useQuery } from "@tanstack/react-query";
import useFetchGenres from "./useFetchGenres";
import { useGlobalConstants } from "../state/useGlobalConstants";

export function useFetchDashboard() {

    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();

    const { fetchGenres } = useFetchGenres();

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

    const fetchDashboardData = async (genreId: number, genreName: string, type: string) => {

        try {
            const response = await fetch(`${TMDB_BASE_URL}/discover/${type}${TMDB_API_KEY}${TMDB_RESPONSE_LANG}&with_genres=${genreId}&sort_by=popularity&page=1`);

            const data = await response.json();

            if (!data.results) throw new Error(data.status_message)

            return {
                name: genreName,
                data: data.results.slice(0, 5),
                totalPages: data.total_pages,
                totalResults: data.total_results,
            };

        } catch (error) {
            console.error(error)
            return []
        }
    }

    return {
        dashboardMovieData,
        dashboardTvData,
        movieGenres,
        tvGenres,
    };
}
