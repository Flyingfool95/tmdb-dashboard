import NO_IMAGE_FOUND from '../assets/no-poster-found.jpg';
import useGlobalConstants from '../state/useGlobalConstants';

export default function ProfileCard({ cast }: any) {

    const { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_THUMBNAIL } = useGlobalConstants();


    return (
        <li className='profile-card'>
            <img src={cast.profile_path ? TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_THUMBNAIL + cast.profile_path : NO_IMAGE_FOUND} alt={cast.name} />
            <p className='actor-name'>{cast.name}</p>
            {
                cast.character &&
                <p className='role-name'>({cast.character})</p>
            }
        </li>
    )
}
