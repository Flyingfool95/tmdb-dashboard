import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFetchMedia from "../hooks/useFetchMedia";
import usePathname from "../hooks/usePathname";

export default function Media() {

    const { mediaId } = useParams();
    const { mediaType } = usePathname();
    const { fetchMedia } = useFetchMedia();

    if (!mediaId) return null;

    const mediaData = useQuery({
        queryKey: ['media-data', mediaId, mediaType],
        queryFn: () => fetchMedia(mediaId, mediaType),
    })

    if (mediaData.isLoading) return <p>Loading...</p>;

    if (!mediaData.data) return null;

    return (

        <main className="media" style={{ backgroundImage: `url(${mediaData.data.backDrop})` }
        }>

            <div className="media__poster">
                <img src={mediaData.data.poster} alt={mediaData.data.title} />
            </div>

            <div className="media__details">
                <h1>{mediaData.data.title}</h1>

                <p>{mediaData.data.releaseYear}</p>

                <ul className="media__genres">
                    {
                        mediaData.data.genres && mediaData.data.genres.map((genre: any) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))
                    }
                </ul>

                <p>{mediaData.data.description}</p>
            </div>
        </main>

    )
}
