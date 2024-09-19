import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useFetchGenres from '../hooks/useFetchGenres';
import '../styling/components/navbar.scss';
import NavbarSubMenu from './NavbarSubMenu';

export default function Navbar() {

    const { movieGenres, tvGenres } = useFetchGenres();

    const [isSeries, setIsSeries] = useState(false);
    const [isMovies, setIsMovies] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsSeries(location.pathname.includes('series'));
        setIsMovies(location.pathname.includes('movies'));
    }, [location]);


    return (
        <nav>
            <h1>CC Wexo</h1>
            <ul className='navbar-menu'>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                {
                    isMovies && movieGenres.data && (

                        <NavbarSubMenu genres={movieGenres.data.genres} mediaType="movies" />

                    )
                }
                <li><NavLink to="/series">Series</NavLink></li>
                {
                    isSeries && tvGenres.data && (

                        <NavbarSubMenu genres={tvGenres.data.genres} mediaType="series" />

                    )
                }
                <li><NavLink to="/favorites">Favorites</NavLink></li>
            </ul>
        </nav>
    )
}
