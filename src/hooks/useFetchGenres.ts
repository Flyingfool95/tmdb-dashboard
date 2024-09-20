import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useGlobalConstants from "../state/useGlobalConstants";
import usePathname from "./usePathname";

export default function useFetchGenres() {

    const { TMDB_API_KEY, TMDB_BASE_URL } = useGlobalConstants();
    const { mediaType } = usePathname();

    const [currentGenres, setCurrentGenres] = useState([]);

    /**
     * Fetches the list of movie genres from the TMDB API.
     *
     */
    const movieGenres = useQuery({
        queryKey: ['movie-genres'],
        queryFn: () => fetchGenres("movie"),
    });

    /**
     * Fetches the list of TV genres from the TMDB API.
     * 
     */
    const tvGenres = useQuery({
        queryKey: ['tv-genres'],
        queryFn: () => fetchGenres("tv"),
    });


    const fetchGenres = async (type: "movie" | "tv") => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/genre/${type}/list${TMDB_API_KEY}`);

            const data = await response.json();

            if (!data.genres) throw new Error(data.status_message);

            return data;

        } catch (error) {
            console.error(error);
            return null;
        }
    }


    useEffect(() => {
        if (movieGenres.data || tvGenres.data) {
            if (mediaType === "movies") {
                setCurrentGenres(movieGenres.data.genres);
            } else if (mediaType === "series") {
                setCurrentGenres(tvGenres.data.genres);
            } else {
                setCurrentGenres([]);
            }
        }

    }, [movieGenres.data, tvGenres.data, setCurrentGenres, mediaType]);

    return {
        movieGenres,
        tvGenres,
        currentGenres,
    }

}