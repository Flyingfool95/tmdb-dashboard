import NO_IMAGE_FOUND from '../assets/no-poster-found.jpg';
import useGlobalConstants from "../state/useGlobalConstants";

export default function useFetchMedia() {
    const {
        TMDB_API_KEY,
        TMDB_BASE_URL,
        TMDB_RESPONSE_LANG,
        TMDB_IMAGE_BASE_URL,
        TMDB_IMAGE_SIZE_BACKDROP,
        TMDB_IMAGE_SIZE_POSTER
    } = useGlobalConstants();

    const fetchMedia = async (mediaId: string, mediaType: string) => {

        if (!mediaType) return null;

        const type = mediaType === 'movies' ? 'movie' : 'tv';

        try {
            const response = await fetch(`${TMDB_BASE_URL}/${type}/${mediaId}?api_key=${TMDB_API_KEY}&language=${TMDB_RESPONSE_LANG}`);

            const data = await response.json();

            if (!data) throw new Error(data.status_message);

            const title = data.title ? data.title : data.name;
            const poster = data.poster_path ? TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_POSTER + data.poster_path : NO_IMAGE_FOUND;
            const backDrop = data.backdrop_path ? TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_BACKDROP + data.backdrop_path : NO_IMAGE_FOUND;
            const releaseYear = data.release_date ? data.release_date.slice(0, 4) : data.first_air_date.slice(0, 4);
            const description = data.overview;
            const genres = data.genres;

            return {
                id: data.id,
                title,
                poster,
                releaseYear,
                description,
                backDrop,
                genres,
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    return {
        fetchMedia,
    };
}