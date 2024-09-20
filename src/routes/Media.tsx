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

    return (

        <main className="media" style={{ backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${TMDB_IMAGE_SIZE_BACKDROP}${mediaData.data?.backdrop_path})` }
        }>

            <div className="media__poster">
                <img src={TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_POSTER + mediaData.data.poster_path} alt={mediaData.data?.title ?? mediaData.data.name} />
            </div>

            <div className="media__details">
                <h1>{mediaData.data.title ?? mediaData.data.name}</h1>
                <ul className="media__genres">
                    {
                        mediaData.data.genres && mediaData.data.genres.map((genre: any) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))
                    }
                </ul>

                <p>{mediaData.data.overview}</p>
            </div>
        </main>

    )
}
