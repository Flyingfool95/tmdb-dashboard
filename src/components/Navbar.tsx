import { NavLink } from 'react-router-dom';
import '../styling/components/navbar.scss';
import useFetchGenres from '../hooks/useFetchGenres';
import usePathname from '../hooks/usePathname';

export default function Navbar() {

    const { movieGenres, tvGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    return (
        <nav>
            <h1>CC Wexo</h1>
            <ul className='navbar-menu'>
                <li>
                    <NavLink to="/">
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to={`/movies/genre/${movieGenres.data?.genres[0].id}`} className={mediaType === 'movies' ? 'active' : ''}>
                        Movies
                    </NavLink>
                </li>

                <li>
                    <NavLink to={`/series/genre/${tvGenres.data?.genres[0].id}`} className={mediaType === 'series' ? 'active' : ''}>
                        Series
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/favorites">
                        Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
