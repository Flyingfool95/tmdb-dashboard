import { useParams } from "react-router-dom";
import GenreMenu from "../components/GenreMenu";

export default function Genre() {

    const { genreId } = useParams();


    return (
        <main >
            <GenreMenu />
            <h1>Genre: {genreId}</h1>
        </main>
    )
}
