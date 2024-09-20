import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePathname() {

    const location = useLocation();

    const [mediaType, setMediaType] = useState<string>("");


    useEffect(() => {
        if (location.pathname.includes("movies")) {
            setMediaType("movies");
        } else {
            setMediaType("series");

        }
    }, [location]);

    return { mediaType };
}