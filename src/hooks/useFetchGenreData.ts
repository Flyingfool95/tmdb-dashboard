import useGlobalConstants from "../state/useGlobalConstants";
import usePathname from "./usePathname";

export default function useFetchGenreData() {

    const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_RESPONSE_LANG } = useGlobalConstants();
    
    const { mediaType } = usePathname();

    const fetchGenreData = async (genreId: string, pageNumber = 1) => {
        const type = mediaType === 'movies' ? 'movie' : 'tv';

        try {
            // Create an array of page numbers (current and next)
            const pages = [pageNumber, pageNumber + 1, pageNumber + 2];

            // Create fetch promises for each page
            const requests = pages.map(page =>
                fetch(`${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=${TMDB_RESPONSE_LANG}&page=${page}`)
            );

            // Wait for all fetch requests to complete
            const responses = await Promise.all(requests);
            const dataArrays = await Promise.all(responses.map(response => response.json()));

            // Combine results and filter duplicates using a Set
            const combinedResults: any[] = [];
            const seenIds = new Set();

            dataArrays.forEach(data => {
                data.results.forEach((item: any) => {
                    if (!seenIds.has(item.id)) {
                        seenIds.add(item.id);
                        combinedResults.push(item);
                    }
                });
            });

            return combinedResults;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        fetchGenreData,
    };
}
