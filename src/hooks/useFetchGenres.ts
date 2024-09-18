import { useGlobalConstants } from "../state/useGlobalConstants";

export default function useFetchGenres() {

    const { TMDB_API_KEY, TMDB_BASE_URL } = useGlobalConstants();


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