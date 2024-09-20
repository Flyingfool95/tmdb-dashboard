import useGlobalConstants from "../state/useGlobalConstants";
import usePathname from "./usePathname";


export default function useFetchGenresData() {

    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();

    const fetchGenresData = async (genreId: string, type: string, pageNumber = 1) => {

        const url = `${TMDB_BASE_URL}/discover/${type}${TMDB_API_KEY}${TMDB_RESPONSE_LANG}&with_genres=${genreId}&page=${pageNumber}`;

        try {

            const response = await fetch(url);
            const data = await response.json();
            if (!data) throw new Error(data.status_message);
            console.log(data)
            console.log(url);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        fetchGenresData,
    }
}