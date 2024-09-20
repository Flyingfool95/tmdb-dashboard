import { useParams } from "react-router-dom";
import GenreMenu from "../components/GenreMenu";
import { useQuery } from "@tanstack/react-query";
import useFetchGenreData from "../hooks/useFetchGenreData";
import { useEffect, useState } from "react";
import useFetchGenres from "../hooks/useFetchGenres";
import MediaGrid from "../components/MediaGrid";
import usePathname from "../hooks/usePathname";
import { GenreT } from "../types/genre";

export default function Genre() {

    const { genreId } = useParams();
    const { fetchGenreData } = useFetchGenreData();
    const { currentGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    const [pageNumber, setPageNumber] = useState(1);
    const [currentGenre, setCurrentGenre] = useState<GenreT>(null);

    if (!genreId) return null;

    const genreData = useQuery({
        queryKey: ['genre-data', genreId, pageNumber, mediaType],
        queryFn: () => fetchGenreData(genreId, pageNumber),
    })


    useEffect(() => {
        setCurrentGenre(currentGenres.find((genre: GenreT) => genre?.id === parseInt(genreId)) ?? null);
    }, [currentGenres, genreId])


    return (
        <main>
            <h1>{currentGenre?.name}</h1>
            <GenreMenu />

            <MediaGrid media={genreData.data} />
        </main>
    )
}
