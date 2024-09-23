import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePathname() {

    const location = useLocation();

    const [mediaType, setMediaType] = useState<string>("");

    // Set the media type based on the pathname
    useEffect(() => {
        if (location.pathname.includes("movies")) {
            setMediaType("movies");
        } else if (location.pathname.includes("series")) {
            setMediaType("series");
        } else {
            setMediaType("");
        }
    }, [location]);

    return { mediaType };
}