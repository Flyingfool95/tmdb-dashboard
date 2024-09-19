import { NavLink } from "react-router-dom";
import useUtilityFunctions from "../hooks/useUtilityFunctions";

export default function NavbarSubMenu(
    {
        genres,
        mediaType
    }: {
        genres: any,
        mediaType: string
    }
) {
    
    const { slugifyText } = useUtilityFunctions();

    return (
        <ul>
            {genres.map((genre: any) => (
                <li
                    key={genre.id}>
                    <NavLink
                        to={`/${mediaType}/${slugifyText(genre.name)}`}>
                        {genre.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
