import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetchGenres from '../hooks/useFetchGenres';
import usePathname from '../hooks/usePathname';

export default function Navbar() {

    const { movieGenres, tvGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <button onClick={handleToggleMenu} className={`menu-toggle ${showMenu ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={showMenu ? 'open' : ''}>
                <h1><br />CC</h1>
                <ul className='navbar-menu'>
                    <li>
                        <NavLink to="/" onClick={handleToggleMenu}>
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={`/movies/genre/${movieGenres.data?.genres[0].id}`} className={mediaType === 'movies' ? 'active' : ''} onClick={handleToggleMenu}>
                            Movies
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={`/series/genre/${tvGenres.data?.genres[0].id}`} className={mediaType === 'series' ? 'active' : ''} onClick={handleToggleMenu}>
                            Series
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/favorites" onClick={handleToggleMenu}>
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
