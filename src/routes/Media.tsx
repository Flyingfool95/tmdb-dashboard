import { useQuery } from "@tanstack/react-query";
import useFetchMedia from "../hooks/useFetchMedia";
import usePathname from "../hooks/usePathname";
import { useParams } from "react-router-dom";
import useGlobalConstants from "../state/useGlobalConstants";

export default function Media() {

    const { mediaId } = useParams();
    const { mediaType } = usePathname();
    const { fetchMedia } = useFetchMedia();

    const { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_BACKDROP, TMDB_IMAGE_SIZE_POSTER } = useGlobalConstants()


    if (!mediaId) return null;

    const mediaData = useQuery({
        queryKey: ['media-data', mediaId, mediaType],
        queryFn: () => fetchMedia(mediaId, mediaType),
    })

    if (mediaData.isLoading) return <p>Loading...</p>;

    if (!mediaData.data) return null;

    const title = mediaData.data.title ?? mediaData.data.name;
    const poster = TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_POSTER + mediaData.data.poster_path;
    const releaseYear = mediaData.data.release_date.slice(0, 4) ?? mediaData.data.first_air_date.slice(0, 4);
    const description = mediaData.data.overview;
    const backDrop = TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_BACKDROP + mediaData.data.backdrop_path;
    const genres = mediaData.data.genres

    return (

        <main className="media" style={{ backgroundImage: `url(${backDrop})` }
        }>

            <div className="media__poster">
                <img src={poster} alt={title} />
            </div>

            <div className="media__details">
                <h1>{title}</h1>

                <p>{releaseYear}</p>

                <ul className="media__genres">
                    {
                        genres && genres.map((genre: any) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))
                    }
                </ul>

                <p>{description}</p>
            </div>
        </main>

    )
}
