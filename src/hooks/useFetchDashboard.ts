import { useQuery } from "@tanstack/react-query";
import useFetchGenres from "./useFetchGenres";
import useGlobalConstants from "../state/useGlobalConstants";

export default function useFetchDashboard() {

    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();

    const { movieGenres, tvGenres } = useFetchGenres();


    // Fetches the dashboard data for movies.
    const dashboardMovieData = useQuery({
        queryKey: ['dashboard-movie-data'],
        queryFn: () =>
            Promise.all(
                movieGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "movie")),
            ),
        enabled: !!movieGenres.data,
    });

    // Fetches the dashboard data for TV.
    const dashboardTvData = useQuery({
        queryKey: ['dashboard-tv-data'],
        queryFn: () =>
            Promise.all(
                tvGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "tv")),
            ),
        enabled: !!tvGenres.data,
    });

    // Fetches the dashboard data for a specific genre.
    const fetchDashboardData = async (genreId: number, genreName: string, type: "movie" | "tv") => {

        try {
            const response = await fetch(`${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}${TMDB_RESPONSE_LANG}&with_genres=${genreId}&include_adult=false&sort_by=popularity&page=1`);

            const data = await response.json();

            if (!data.results) throw new Error(data.status_message);

            return {
                genre: genreName,
                genreId: genreId,
                data: data.results.slice(0, 15), //Only return the first 15 results of data
                totalPages: data.total_pages,
                totalResults: data.total_results,
            };

        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        dashboardMovieData,
        dashboardTvData,
        movieGenres,
        tvGenres,
    };
}
