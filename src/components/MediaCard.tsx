import { Link } from 'react-router-dom';
import useGlobalConstants from '../state/useGlobalConstants';

export default function MediaCard({ media, mediaType }: { media: any, mediaType: string }) {

    const { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_THUMBNAIL } = useGlobalConstants()


    return (
        <Link to={`/${mediaType}/${media.id}`} className="media-card card-hover">
            <img
                src={
                    TMDB_IMAGE_BASE_URL +
                    TMDB_IMAGE_SIZE_THUMBNAIL +
                    media.poster_path
                }

                alt={`${media.title} poster`}
            />


            <div className='media-card__details'>
                <h4 className='media-card__title'>
                    {media.original_title ?? media.original_name}
                </h4>
            </div>
        </Link>
    )
}
