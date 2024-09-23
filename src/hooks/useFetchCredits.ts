import useGlobalConstants from "../state/useGlobalConstants";

export default function useFetchCredits() {
    const {
        TMDB_API_KEY,
        TMDB_BASE_URL,
    } = useGlobalConstants();

    /**
     * Fetches the cast and crew credits for a given media ID and type from the TMDB API.
     *
     * @param {string} mediaId The ID of the media to fetch.
     * @param {string} mediaType The type of media to fetch. Must be either "movie" or "tv".
     *
     * @returns {Promise<{actors: {id: number, name: string}[], directors: {id: number, name: string}[]}>} A promise that resolves to an object containing two arrays: actors and directors.
     *
     * @throws {Error} If the request fails or if the response does not contain the expected data.
     */
    const fetchCredits = async (mediaId: string, mediaType: string) => {

        if (!mediaType) return null;

        // Correct the media type
        const type = mediaType === 'movies' ? 'movie' : 'tv';

        try {

            // Ensure the API key is appended correctly as a query parameter
            const response = await fetch(`${TMDB_BASE_URL}/${type}/${mediaId}/credits?api_key=${TMDB_API_KEY}`);

            const data = await response.json();

            if (!data) throw new Error("No data returned from API");


            return {
                actors: [...new Set(data.cast.filter((actor: any) => actor.known_for_department === "Acting"))],

                directors: [...new Set(data.crew.filter((director: any) => director.job === "Director"))],

            };

        } catch (error) {
            console.error("Error fetching credits:", error);
            return null;
        }
    };

    return {
        fetchCredits,
    };
}
