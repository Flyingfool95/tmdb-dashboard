import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import usePathname from "./usePathname";
import { useGlobalConstants } from "../state/useGlobalConstants";
import { useGenreState } from "../state/useGenreState";

export default function useFetchGenres() {

    const { currentGenres, setCurrentGenres } = useGenreState();
    const { TMDB_API_KEY, TMDB_BASE_URL } = useGlobalConstants();
    const { mediaType } = usePathname();

    /**
     * Fetches the list of movie genres from the TMDB API.
     *
     */
    const movieGenres = useQuery({
        queryKey: ['movie-genres'],
        queryFn: () => fetchGenres("movie"),
    })

    /**
     * Fetches the list of TV genres from the TMDB API.
     * 
     */
    const tvGenres = useQuery({
        queryKey: ['tv-genres'],
        queryFn: () => fetchGenres("tv"),
    })

    /**
     * Fetches the list of genres from the TMDB API.
     *
     * @param type The type of media to fetch genres for. Must be either "movie" or "tv".
     * @returns A promise that resolves to an object containing the list of genres.
     * @throws An error if the request fails or if the response does not contain the expected data.
     */
    const fetchGenres = async (type: "movie" | "tv") => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/genre/${type}/list${TMDB_API_KEY}`);
            const data = await response.json();
            if (!data.genres) throw new Error(data.status_message)
            return data;

        } catch (error) {
            console.error(error)
            return null
        }
    }


    useEffect(() => {
        if (movieGenres.data || tvGenres.data) {
            setCurrentGenres(mediaType === "movies" ? movieGenres.data.genres : tvGenres.data.genres);
        }

    }, [movieGenres.data, tvGenres.data, setCurrentGenres, mediaType])

    return {
        movieGenres,
        tvGenres,
        currentGenres,
    }

}