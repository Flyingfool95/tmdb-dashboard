export default function useFetch() {

    const TMDB_API_KEY = `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_RESPONSE_LANG = `&language=en-US`;



    const fetchGenres = async (type: string) => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/genre/${type}/list${TMDB_API_KEY}`);

            const data = await response.json();

            if (!data.genres) throw new Error(data.status_message)

            return data;
        } catch (error) {

            console.error(error)

            return []
        }
    }

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
        fetchGenres,
        fetchDashboardData,
    }

}