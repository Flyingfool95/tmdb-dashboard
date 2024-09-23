import { useQuery } from "@tanstack/react-query";
import useFetchGenres from "./useFetchGenres";
import useGlobalConstants from "../state/useGlobalConstants";

export default function useFetchDashboard() {

    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();

    const { movieGenres, tvGenres } = useFetchGenres();


    /**
     * Fetches the dashboard data for movies.
     *
     * This query is only enabled if the movie genres have been fetched.
     * It fetches the data for each movie genre and returns an array of the results.
     */
    const dashboardMovieData = useQuery({
        queryKey: ['dashboard-movie-data'],
        queryFn: () =>
            Promise.all(
                movieGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "movie")),
            ),
        enabled: !!movieGenres.data,
    });

    /**
     * Fetches the dashboard data for TV shows.
     *
     * This query is only enabled if the TV genres have been fetched.
     * It fetches the data for each TV genre and returns an array of the results.
     */
    const dashboardTvData = useQuery({
        queryKey: ['dashboard-tv-data'],
        queryFn: () =>
            Promise.all(
                tvGenres.data.genres.map((genre: { id: number, name: string }) => fetchDashboardData(genre.id, genre.name, "tv")),
            ),
        enabled: !!tvGenres.data,
    });

    /**
     * Fetches the dashboard data for a specific genre.
     *
     * @param {number} genreId The ID of the genre to fetch.
     * @param {string} genreName The name of the genre to fetch.
     * @param {string} type The type of media to fetch. Must be either "movie" or "tv".
     *
     * @returns {Promise<{name: string, data: any[], totalPages: number, totalResults: number}>} A promise that resolves to an object containing the name of the genre, an array of the results, the total number of pages, and the total number of results.
     *
     * @throws {Error} If the request fails or if the response does not contain the expected data.
     */
    const fetchDashboardData = async (genreId: number, genreName: string, type: "movie" | "tv") => {

        try {
            const response = await fetch(`${TMDB_BASE_URL}/discover/${type}${TMDB_API_KEY}${TMDB_RESPONSE_LANG}&with_genres=${genreId}&include_adult=false&sort_by=popularity&page=1`);

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
