import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFetchMedia from "../hooks/useFetchMedia";
import usePathname from "../hooks/usePathname";
import useFetchCredits from "../hooks/useFetchCredits";
import ProfileCard from "../components/ProfileCard";

export default function Media() {

    const { mediaId } = useParams();
    const { mediaType } = usePathname();
    const { fetchMedia } = useFetchMedia();
    const { fetchCredits } = useFetchCredits();


    if (!mediaId) return null;

    const mediaData = useQuery<any>({
        queryKey: ['media-data', mediaId, mediaType],
        queryFn: () => fetchMedia(mediaId, mediaType),
    })
    const creditsData = useQuery({
        queryKey: ['credits-data', mediaId, mediaType],
        queryFn: () => fetchCredits(mediaId, mediaType),
    })

    if (mediaData.isLoading) return <p>Loading...</p>;

    if (!mediaData.data || !creditsData.data) return null;

    return (

        <main className="media" style={{ backgroundImage: `url(${mediaData.data.backDrop})` }
        }>

            <div className="media__poster">
                <img src={mediaData.data.poster} alt={mediaData.data.title} />
            </div>

            <div className="media__details">
                <h1>{mediaData.data.title}</h1>

                <p className="media__year">Release year: {mediaData.data.releaseYear}</p>

                <ul className="media__genres">
                    {
                        mediaData.data.genres && mediaData.data.genres.map((genre: any) => (
                            <li key={genre.id}><Link to={`/${mediaType}/genre/${genre.id}`} key={genre.id}>{genre.name}</Link></li>
                        ))
                    }
                </ul>

                <p>{mediaData.data.description}</p>


                <div className="media__directors">
                    <h2>Directors</h2>

                    {
                        creditsData.data.directors.length > 0 ?
                            <ul>
                                {
                                    creditsData.data.directors.map((cast: any) => (
                                        <ProfileCard key={cast.id} cast={cast} />
                                    ))
                                }
                            </ul>
                            :
                            <p>No directors found</p>
                    }
                </div>

                <div className="media__actors">
                    <h2>Actors</h2>
                    {
                        creditsData.data.actors.length > 0 ?
                            <ul>
                                {
                                    creditsData.data.actors.map((cast: any) => (
                                        <ProfileCard key={cast.id} cast={cast} />
                                    ))
                                }
                            </ul>
                            :
                            <p>No actors found</p>
                    }
                </div>
            </div>

        </main >

    )
}
