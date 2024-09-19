import { NavLink, useLocation } from 'react-router-dom';
import '../styling/components/navbar.scss';
import useFetchGenres from '../hooks/useFetchGenres';
import { useEffect, useState } from 'react';

export default function Navbar() {

    const { movieGenres, tvGenres } = useFetchGenres();

    const location = useLocation();

    const [isSeries, setIsSeries] = useState(false);
    const [isMovies, setIsMovies] = useState(false);

    useEffect(() => {
        setIsSeries(location.pathname.includes('series'));
        setIsMovies(location.pathname.includes('movies'));
    }, [location]);




    return (
        <nav>
            <h1>CC Wexo</h1>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                {
                    isMovies && (

                        <ul>
                            {movieGenres.data.genres.map((genre: any) => (
                                <li key={genre.id}><NavLink to={`/movies/${genre.name}`}>{genre.name}</NavLink></li>
                            ))}
                        </ul>

                    )
                }
                <li><NavLink to="/series">Series</NavLink></li>
                {
                    isSeries && (

                        <ul>
                            {tvGenres.data.genres.map((genre: any) => (
                                <li key={genre.id}><NavLink to={`/series/${genre.name}`}>{genre.name}</NavLink></li>
                            ))}
                        </ul>

                    )
                }
                <li><NavLink to="/favorites">Favorites</NavLink></li>
            </ul>
        </nav>
    )
}
