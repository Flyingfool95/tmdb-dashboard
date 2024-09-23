import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenreMenu from "../components/GenreMenu";
import MediaGrid from "../components/MediaGrid";
import useFetchGenreData from "../hooks/useFetchGenreData";
import useFetchGenres from "../hooks/useFetchGenres";
import usePathname from "../hooks/usePathname";
import { GenreT } from "../types/genre";

export default function Genre() {

    const { genreId } = useParams();
    const { fetchGenreData } = useFetchGenreData();
    const { currentGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    const [currentGenre, setCurrentGenre] = useState<GenreT>(null);

    if (!genreId) return null;

    // Fetches data for a specific genre and page number from the TMDB API.
    const genreData = useQuery({
        queryKey: ['genre-data', genreId, mediaType],
        queryFn: () => fetchGenreData(genreId),
    })

    useEffect(() => {
        setCurrentGenre(currentGenres.find((genre: GenreT) => genre?.id === parseInt(genreId)) ?? null);
    }, [currentGenres, genreId])


    return (
        <main>
            <div className="genre-hero">
                <h1>{currentGenre?.name}</h1>
            </div>
            <GenreMenu />

            <MediaGrid media={genreData.data} />
        </main>
    )
}
