import { create } from "zustand";

const useGlobalConstants = create(() => ({
    TMDB_API_KEY: `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_RESPONSE_LANG: `&language=en-US`,

    TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    TMDB_IMAGE_SIZE_BACKDROP: 'w1280',
    TMDB_IMAGE_SIZE_POSTER: 'w780',
    TMDB_IMAGE_SIZE_THUMBNAIL: 'w342',
    TMDB_IMAGE_SIZE_THUMBNAIL_MOBILE: 'w154',
}))

export default useGlobalConstants;