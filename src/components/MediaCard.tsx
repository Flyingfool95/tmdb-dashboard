import { Link } from 'react-router-dom';
import { useGlobalConstants } from '../state/useGlobalConstants';
import '../styling/components/mediaCard.scss';

export default function MediaCard({ media }: { media: any }) {

    const { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_THUMBNAIL } = useGlobalConstants()


    return (
        <Link to={`/media/${media.id}`} className="media-card card-hover">
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
