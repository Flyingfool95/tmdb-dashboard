import { useParams } from "react-router-dom";

export default function Genre() {

    const { genreId } = useParams();
    return (
        <main >
            <h1>Genre: {genreId}</h1>
        </main>
    )
}
