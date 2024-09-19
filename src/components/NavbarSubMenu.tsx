import { NavLink } from "react-router-dom";

export default function NavbarSubMenu(
    {
        genres,
        mediaType
    }: {
        genres: any,
        mediaType: string
    }
) {

    return (
        <ul className='navbar-submenu'>
            {genres.map((genre: any) => (
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
