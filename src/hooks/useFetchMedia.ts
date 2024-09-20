import useGlobalConstants from "../state/useGlobalConstants";

export default function useFetchMedia() {
    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();


    const fetchMedia = async (mediaId: string, mediaType: string) => {

        try {
            const type = mediaType === 'movies' ? 'movie' : 'tv';

            const response = await fetch(`${TMDB_BASE_URL}/${type}/${mediaId}${TMDB_API_KEY}&language=${TMDB_RESPONSE_LANG}`);

            const data = await response.json();

            console.log(data)
            return data;
        } catch (error) {
            console.error(error);
        }

    };

    return {
        fetchMedia,
    };
}