export default function useFetch() {

    const TMDB_API_KEY = `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';



    const fetchGenres = async (type: string) => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/genre/${type}/list${TMDB_API_KEY}`);
            const data = await response.json();
            if (!data.genres) throw new Error(data.status_message)

            console.log(data)
            return data;
        } catch (error) {
            console.error(error)
            return []
        }
    }

    const fetchDashboardData = async () => {

        try {
            const response = await fetch(TMDB_BASE_URL + '/' + TMDB_API_KEY);

            const data = await response.json();

            if (!data.results) throw new Error(data.status_message)

            console.log(data)
            return data;

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