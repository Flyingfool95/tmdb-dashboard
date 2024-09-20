import { useQuery } from "@tanstack/react-query";
import useFetchMedia from "../hooks/useFetchMedia";
import usePathname from "../hooks/usePathname";
import { useParams } from "react-router-dom";

export default function Media() {

    const { mediaId } = useParams();
    const { mediaType } = usePathname();
    const { fetchMedia } = useFetchMedia();

    if (!mediaId) return null;

    const mediaData = useQuery({
        queryKey: ['media-data', mediaId, mediaType],
        queryFn: () => fetchMedia(mediaId, mediaType),
    })

    if (mediaData.isLoading) return <p>Loading...</p>

    return (
        <main>
            <h1>{mediaData.data.title ?? mediaData.data.name}</h1>
        </main>
    )
}
