import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

export function useFetchDashboard() {

    const TMDB_API_KEY = `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_RESPONSE_LANG = `&language=en-US`;

    const { fetchGenres } = useFetch();

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
