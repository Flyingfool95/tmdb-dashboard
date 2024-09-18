import { create } from "zustand";


export const useGlobalConstants = create(() => ({
    TMDB_API_KEY: `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_RESPONSE_LANG: `&language=en-US`,
}))
