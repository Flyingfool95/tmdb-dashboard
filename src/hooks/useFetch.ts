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


    return {
        fetchGenres,
    }

}