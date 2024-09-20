import { useParams } from "react-router-dom";
import GenreMenu from "../components/GenreMenu";
import { useQuery } from "@tanstack/react-query";
import useFetchGenresData from "../hooks/useFetchGenresData";
import { useEffect, useState } from "react";
import useFetchGenres from "../hooks/useFetchGenres";
import { GenreT } from "../types/genre";
import MediaGrid from "../components/MediaGrid";
import usePathname from "../hooks/usePathname";

export default function Genre() {

    const { genreId } = useParams();
    const { fetchGenresData } = useFetchGenresData();
    const { currentGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    const [pageNumber, setPageNumber] = useState(1);
    const [currentGenre, setCurrentGenre] = useState<GenreT>(null);

    if (!genreId) return null;

    const genreData = useQuery({
        queryKey: ['genre-data', genreId, pageNumber, mediaType],
        queryFn: () => fetchGenresData(genreId, mediaType === 'movies' ? 'movie' : 'tv', pageNumber),
    })


    useEffect(() => {
        if (genreData.data) {
            console.log(genreData.data)
        }
    }, [genreData.data])

    useEffect(() => {
        setCurrentGenre(currentGenres.find((genre: GenreT) => genre?.id === parseInt(genreId)) ?? null);
    }, [currentGenres, genreId])


    return (
        <main>
            <h1>{currentGenre?.name}</h1>
            <GenreMenu />

            <MediaGrid media={genreData.data?.results} />
        </main>
    )
}
