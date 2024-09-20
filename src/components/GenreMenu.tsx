import { NavLink } from "react-router-dom";
import useFetchGenres from "../hooks/useFetchGenres";
import usePathname from "../hooks/usePathname";

export default function GenreMenu() {

    const { currentGenres } = useFetchGenres();
    const { mediaType } = usePathname();

    return (
        <ul className='genre-menu'>
            {currentGenres && currentGenres.map((genre: any) => (
                <li
                    key={genre.id}>
                    <NavLink
                        to={`/${mediaType}/genre/${genre.id}`}>
                        {genre.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
